import { AppBar, Button, CssBaseline, Stack } from "@mui/material";
import "./App.css";
import SearchIcon from "@mui/icons-material/Search";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import MapIcon from "@mui/icons-material/Map";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { GREY100, ORANGE } from "./util/common";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FilterSearchBar from "./components/FilterSearchBar";
import Logo from "./components/Logo";
import RoomsList from "./components/RoomsList";

const theme = createTheme({
  palette: {
    primary: {
      main: ORANGE, // Replace with your desired color
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 1200,
      lg: 1600,
      xl: 1940,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        sx={{
          backgroundColor: "white",
          borderBottom: `1px solid ${GREY100}`,
          padding: "8px 16px",
        }}
        elevation={0}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Logo />
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              sx={{ minWidth: 0, padding: 1 }}
              disableElevation
            >
              <SearchIcon />
            </Button>
            <Button
              variant="contained"
              sx={{ minWidth: 0, padding: 1 }}
              disableElevation
            >
              <GridViewRoundedIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{ minWidth: 0, padding: 1 }}
              disableElevation
            >
              <MapIcon />
            </Button>
            <Button
              variant="outlined"
              sx={{ minWidth: 0, padding: 1 }}
              disableElevation
            >
              <DarkModeIcon />
            </Button>
          </Stack>
        </div>
      </AppBar>
      <div
        style={{
          height: "calc((100vh - 80px))",
          width: "100vw",
          paddingTop: 80,
        }}
      >
        <FilterSearchBar />
        <RoomsList />
      </div>
    </ThemeProvider>
  );
}

export default App;
