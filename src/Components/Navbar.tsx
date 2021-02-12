import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  Image: {  
    height: "3vw",
    margin: "0 1vw 0 0",
    filter: "drop-shadow(0 0 3px white)",
    [theme.breakpoints.down('xs')]: {
      height: "8.5vh", 
    }
  }

}));

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
        <Box display='flex' justifyContent='space-between' alignItems='center' width={1} >
        <Typography variant="h2" color="inherit">
          <Box p={1} display='flex' alignItems='center' >
            POKEDEX
          </Box>
          </Typography>
          <a href='https://github.com/Balazs-D/pokedex' target='_blank' rel="noreferrer">
            <i className="fab fa-github fa-3x" style={{color: 'white'}}></i></a>
          </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
