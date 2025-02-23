import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

interface recipeSummary {
  name: string;
  cookTime: number;
  ingredients: requiredItem[];
}

// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: Map<string, recipe | ingredient> = new Map();
const INGREDIENT = "ingredient";
const RECIPE = "recipe";

// Task 1 helper (don't touch)
app.post("/parse", (req: Request, res: Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input);
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  }
  res.json({ msg: parsed_string });
  return;
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that
const parse_handwriting = (recipeName: string): string | null => {
  const parsedRecipeName = recipeName
    .toLowerCase()
    .replace(/[-|_]/g, " ")
    .replace(/[^a-z ]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase());

  return parsedRecipeName || null;
};

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req: Request, res: Response) => {
  const entry = req.body;
  const { type, name } = entry;

  if (![RECIPE, INGREDIENT].includes(type) || cookbook.has(name)) {
    // this entry name already exists in the cookbook, so return an error
    return res.status(400).json({ error: "Error: invalid type or name" });
  }

  if (type === RECIPE) {
    const requiredItemNames = entry.requiredItems.map((item) => item.name);
    const uniqueRequiredItems = new Set(requiredItemNames);

    if (requiredItemNames.length !== uniqueRequiredItems.size) {
      // duplicated in the required item list
      return res
        .status(400)
        .json({ error: "Error: required items contains duplicates" });
    }
  }

  if (type === INGREDIENT && entry.cookTime < 0) {
    return res.status(400).json({ error: "Error: invalid cook time" });
  }

  // no errors, add the entry to the cookbook
  cookbook.set(name, entry);
  res.status(200).json({});
});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name

app.get("/summary", (req: Request, res: Request) => {
  const name = req.query.name as string;
  // initialise map for faster processing of multiple identical ingredients
  const ingredientMap = new Map<string, { name: string; quantity: number }>();
  const summary: recipeSummary = {
    name,
    cookTime: 0,
    ingredients: [],
  };

  // find the recipe, if it doesn't exist or is not a recipe, return error
  const recipe = cookbook.get(name) as recipe;
  if (!recipe || recipe.type !== RECIPE) {
    return res
      .status(400)
      .json({ error: "Error: provided name is not a valid recipe" });
  }

  const toProcess = [...recipe.requiredItems];

  while (toProcess.length > 0) {
    const requiredItem = toProcess.pop();
    const entryInCookbook = cookbook.get(requiredItem.name);

    if (!entryInCookbook) {
      return res
        .status(400)
        .json({ error: "Error: entry required is not in the cookbook" });
    }

    if (entryInCookbook.type == INGREDIENT) {
      const existingIngredient = ingredientMap.get(entryInCookbook.name);
      if (existingIngredient) {
        // if it already exists in the summary, increment its quantity.
        existingIngredient.quantity += requiredItem.quantity;
      } else {
        // if the entry is an ingredient and is not yet in the summary,
        // add the ingredient to the summary.
        ingredientMap.set(entryInCookbook.name, {
          name: entryInCookbook.name,
          quantity: requiredItem.quantity,
        });
      }

      // add the ingredients' cook time to the total cook time;
      summary.cookTime += (entryInCookbook as ingredient).cookTime;
    } else {
      // push all the required items in the recipe to the stack
      (entryInCookbook as recipe).requiredItems.forEach((item) => {
        toProcess.push({
          name: item.name,
          quantity: item.quantity * requiredItem.quantity,
        });
      });
    }
  }

  // convert the ingredient map to an array before returning
  summary.ingredients = Array.from(ingredientMap.values());
  res.status(200).json(summary);
});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
