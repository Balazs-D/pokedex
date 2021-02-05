import React, { Fragment, useContext, useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Navbar from "./Components/Navbar";
import Content from "./Components/PokemonList";
import ContextContainer from './Context/Container'


const App = () => {

  


  return (
    <Fragment>
      <ContextContainer>
      <CssBaseline />
      <Navbar />

      <Container maxWidth="lg">
          <Content />
          {/* <TEST /> */}
      
        </Container>
        </ContextContainer>
    </Fragment>
  );
};

export default App;
