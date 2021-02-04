import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Pokédex
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
