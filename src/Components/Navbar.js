import React from "react";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LogoText from "../Graphics/Background/pText.png";
import LogoIcon from "../Graphics/Background/pokeBall.png";

const LogoT = styled.img`
  height: 6vh;
  filter: drop-shadow(0px 0px 1px white);
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translate(-50%);
`;

const LogoB = styled.img`
  height: 6vh;
  filter: drop-shadow(0 0 6px white);
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translate(-50%);
`;
const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      style={{
        background: "#2E3B55",
        height: "14vh",
      }}
    >
      <Toolbar>
        <Typography variant="title" color="inherit">
          <Box w={1} display="flex" justifyContent="center" bg="white">
            <LogoB alt="pokemon_ball" src={LogoIcon} />
            <LogoT alt="logoText" src={LogoText} />
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
