import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const drawerWidth = 240;

const NavbarComponent = () => {
  return (
    <AppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          className="text-blue"
          sx={{ fontWeight: "bold" }}
        >
          OpenInterveu
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarComponent;
