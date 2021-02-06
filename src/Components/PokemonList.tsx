import React, { useEffect, useState, useContext, FunctionComponent, useCallback } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {
  Box,
  Grid,
  Button,
  Slider,
  Typography
} from "@material-ui/core";
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import { PokemonOverviewCard } from "./PokemonOverviewCard";
import {Context} from '../Context/Context'
const BG = require("../Graphics/Background/bg.jpg");

export const Content: FunctionComponent = () => {
  interface EventTarget {
    value: number;
}
  const context = useContext(Context)
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=0`);

// ---------------------------- Pokemon Name + URl 
  

  const loadAllPokeDetails = async () => {

    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await response.json();
    setUrl(data.next)
    if (data) {

      // Loop through recent fetched data for details url
      for (let i = 0; i < data.results.length; i++) {
        let info = await fetch(data.results[i].url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        
        let dataIteration = await info.json();
        setAllPokemonDetails(prev => (prev.concat(dataIteration)))
        
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadAllPokeDetails()
    }
    fetchData();
  }, []);

  return (
    <Box id='content' m={3} component='span' >
    
      <Grid container spacing={10} max-width="xl" component="span" style={{minHeight: '100vh'}}>
          
          {allPokemonDetails &&
            allPokemonDetails.map((item, i) => {
            
          return (
            
            <PokemonOverviewCard 
              title={item.name}
              image={item.sprites.other.dream_world.front_default}
              key={i}
              background={"../Graphics/Background/bg.jpg"}
              component={PokemonOverviewCard}
              id={item.id}
            />
        );
        })}
      </Grid> 
      <Box display="flex" alignItems="center" justifyContent="center" mt={5}>   
        <Button endIcon={<ArrowForwardIosRoundedIcon />} fullWidth={true} size="large" variant="contained" color="primary" onClick={() => { loadAllPokeDetails() }} disabled={allPokemonDetails.length < 21 }>Load More</Button> 
      </Box>
      

      </Box>
  );
};

export default Content;
