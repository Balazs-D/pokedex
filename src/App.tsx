import React, { Fragment } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Navbar from "./Components/Navbar";
import Content from "./Components/PokemonList";



const App = () => {
  return (
    <Fragment>
      <CssBaseline />
      <Navbar />

      <Container maxWidth="lg">
        <Content />
      
      </Container>
    </Fragment>
  );
};

export default App;
