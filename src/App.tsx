import React, { Fragment, useContext, useState, useEffect } from "react";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Navbar from "./Components/Navbar";
import Content from "./Components/PokemonList";
import ContextContainer from './Context/Container'
import {PokemonDetails} from './Components/PokemonDetails';
import { Context } from "./Context/Context";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Share Tech Mono',
    ].join(','),
  },
});
  
const App = () => {
  const context = useContext(Context)

  


  return (
    <Fragment>
      <ContextContainer>
        <CssBaseline />
        <Router>
        <ThemeProvider theme={theme}>

      <Navbar />
      
            <Container
              maxWidth="lg"
              max-width='false'
            >
              
        <Switch>
            <Route exact path="/" component={Content} />
            <Route exact path="/:id" component={()=> <PokemonDetails />} /> 
          </Switch> 
            </Container>
            </ThemeProvider>
        </Router>
        
        </ContextContainer>
    </Fragment>
  );
};

export default App;
