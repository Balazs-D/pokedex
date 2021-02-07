import React, { useEffect, useState, useContext, FunctionComponent, useCallback } from "react";
import {
  Box,
  Grid,
  Button,
  Slider,
  Typography
} from "@material-ui/core";
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import { PokemonOverviewCard } from "./PokemonOverviewCard";
import {Loading} from "./Loading";

import {Context} from '../Context/Context'
const BG = require("../Graphics/Background/bg.jpg");



export const Content: FunctionComponent = () => {
  
  const context = useContext(Context)
  const [allPokemonDetails, setAllPokemonDetails] = useState<any>([]);
  const [url, setUrl] = useState<string>(`https://pokeapi.co/api/v2/pokemon?limit=21&offset=0`);
  const [loadCounter, setLoadCounter] = useState<boolean>(true);

  
  const loadAllPokeDetails = async () => {
    setLoadCounter(true)
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

      setLoadCounter(false)
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadAllPokeDetails()
    }
    fetchData();
  }, []);


  return (
    <Box id='content' m={3} component="span">
    
      <Grid container spacing={10} max-width="xl" component="span" >
          
          {allPokemonDetails.length > 10 ?
            allPokemonDetails.map((item, i) => {
            
          return (
            
            <PokemonOverviewCard 
              title={item.name}
              image={item.sprites.other.dream_world.front_default}
              key={i}
              background={"../Graphics/Background/bg.jpg"}
              component={PokemonOverviewCard}
              id={item.id}
              typeOne={item.types[0].type.name}
              typeTwo={item.types.length >= 2 ? item.types[1].type.name : '' }
            />
        );
            }) : <Loading pokemonArray={ allPokemonDetails.length}/>}
      </Grid> 
      <Box display="flex" alignItems="center" justifyContent="center" mt={5}>   
        {allPokemonDetails &&
          <Button
            variant="outlined"
            startIcon={<ExpandMoreTwoToneIcon />}
            endIcon={<ExpandMoreTwoToneIcon />}
            fullWidth={true}
            size="large"
            color="primary"
            onClick={() => { loadAllPokeDetails() }} disabled={loadCounter}>
          
            Load More
            
            </Button>}
      </Box>
      

      </Box>
  );
};

export default Content;
