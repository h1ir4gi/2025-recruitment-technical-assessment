import { Typography } from "@mui/material";
import freeRoomsLogoOpen from "../assets/freeRoomsLogo.png";
import freeRoomsLogoClosed from "../assets/freeroomsDoorClosed.png"
import { ORANGE } from "../util/common";
import { useState } from "react";

export default function Logo() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div onClick={() => setIsOpen((prev) => !prev)} style={{display: 'inline-flex'}}>
      <img src={isOpen ? freeRoomsLogoOpen : freeRoomsLogoClosed} style={{ height: 50 }} />
      <Typography
        sx={{
          color: ORANGE,
          fontFamily: "Josefin Sans, sans-serif",
          fontWeight: 700,
          marginRight: "auto",
          fontSize: '2rem'
        }}
      >
        Freerooms
      </Typography>
    </div>
  );
}
