import React, { useEffect, useState, useContext, FunctionComponent  } from "react";
import {
  Box,
  Grid,
  Button,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import { PokemonOverviewCard } from "./PokemonOverviewCard";
import {Loading} from "./Loading";
import { Context } from '../Context/Context'

export const Content: FunctionComponent = () => {
  const context = useContext(Context)
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [loadCounter, setLoadCounter] = useState<boolean>(false);

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const loadMore = async () => {
    await setLoadCounter(true);
    await context.loadAllPokeDetails();
    await setLoadCounter(false)

  };

  useEffect(() => {
    async function fetchData() {
      setIsMounted(true);
      setLoadCounter(true)
      await context.loadAllPokeDetails();
      setLoadCounter(false);
    };
   
    if (context.allPokemonDetails.length === 0) {
      fetchData();
    }

    return () => {
      setIsMounted(false)
    }
  }, []);


  return (
    <Box id='content' m={3} component="span" width='100%'>
      <Grid container direction="row" spacing={isSmall ? 2 : 10} max-width="xl" component="span" >
      
          {context.allPokemonDetails.length > 10 ?
            context.allPokemonDetails.map((item, i) => {
            
          return (
           
            <PokemonOverviewCard
              title={item.name}
              image={item.sprites.other.dream_world.front_default}
              key={i}
              id={item.id}
              typeOne={item.types[0].type.name}
              typeTwo={item.types.length >= 2 ? item.types[1].type.name : ''}
              
            />
        );
            }) : <Loading pokemonArray={context.allPokemonDetails.length} />}
         
      </Grid> 
      <Box display="flex" alignItems="center" justifyContent="center" mt={5}>   
    
        {context.allPokemonDetails &&
          <Button
            variant="outlined"
            startIcon={<ExpandMoreTwoToneIcon />}
            endIcon={<ExpandMoreTwoToneIcon />}
            fullWidth={true}
            size="large"
            color="primary"
            onClick={() => { loadMore() }}
            disabled={loadCounter}>
          
            Load More
            
            </Button>}
      </Box>
      
      </Box>
  );
};

export default Content;
