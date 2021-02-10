import React from "react";
import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoIcon from "../Graphics/Background/pokeBall.png";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Image: {  
    height: "4.5vh",
    margin: "0 1vw 0 0",
    filter: "drop-shadow(0 0 3px white)"
  }
});

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="sticky"
      style={{
        background: "#2E3B55",
      }}
    >
      <Toolbar>
        <Typography variant="h2" color="inherit">
          <Box p={1}>
            <img className={classes.Image} alt="pokemon_ball" src={LogoIcon} />
            POKEDEX
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
