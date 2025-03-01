import { FilterAlt, FilterList, Search } from "@mui/icons-material";
import { Box, IconButton, InputBase, Paper, styled } from "@mui/material";
import { GREY100, ORANGE } from "../util/common";

const CustomBox = styled(Box)({
  border: `2px solid ${ORANGE}`,
  borderRadius: 10,
  padding: "1px 20px",
  display: "flex",
  alignItems: "center",
  color: ORANGE,
  fontWeight: 600,
  width: 100,
  height: 40,
});

export default function FilterSearchBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: 60,
        padding: "4px 16px",
      }}
    >
      <CustomBox>
        <FilterAlt sx={{ marginRight: 2, marginBottom: 0.5 }} />
        Filters
      </CustomBox>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "60%",
          border: `1px solid ${GREY100}`,
          height: 40,
        }}
        elevation={0}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a building..."
          inputProps={{ "aria-label": "search a building" }}
        />
      </Paper>
      <CustomBox>
        <FilterList sx={{ marginRight: 2, marginBottom: 0.5 }} />
        Sort
      </CustomBox>
    </div>
  );
}
