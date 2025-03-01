import {
  Card,
  Grid2,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import data from "../../data.json";
import { ORANGE } from "../util/common";
import { Circle } from "@mui/icons-material";

export default function RoomsList() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid2 container spacing={2} padding={3}>
      {data.map((building) => {
        return (
          <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}>
            <Card
              sx={{
                marginTop: 1,
                height: {
                  xs: 150,
                  sm: 300,
                  md: 400,
                  lg: 490,
                },
                position: "relative",
                display: "flex",
                justifyContent: "center",
                backgroundImage: `url(/${
                  building.building_picture || building.building_file
                })`,
                backgroundSize: "cover",
                backgroundColor: ["rgba(0, 0, 0, 0.3)", "transparent"],
                backgroundBlendMode: ["darken", "none"],
              }}
            >
              {
                <>
                  <Card
                    sx={{
                      position: "absolute",
                      bottom: 10,
                      width: "95%",
                      backgroundColor: { xs: "transparent", sm: ORANGE },
                      borderRadius: 2,
                    }}
                    elevation={0}
                  >
                    <Typography
                      sx={{
                        padding: "15px 20px",
                        fontWeight: 700,
                        color: "white",
                        fontSize: { xs: "1.6rem", sm: "1.1rem" },
                      }}
                    >
                      {" "}
                      {building.name}
                    </Typography>
                  </Card>
                  <Card
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      width: 'fit-content',
                      padding: "1px",
                      backgroundColor: "white",
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ padding: "5px 5px", fontWeight: 600 }}>
                      <Circle sx={{ color: "green", height: "12px" }} />
                      {building.rooms_available}
                      {isSmallScreen
                        ? `/${building.rooms_available}`
                        : " rooms available"}
                    </Typography>
                  </Card>
                </>
              }
            </Card>
          </Grid2>
        );
      })}
    </Grid2>
  );
}
