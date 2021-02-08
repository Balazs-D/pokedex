import React, { useEffect, useState, useContext, FunctionComponent } from "react";
import {
  Box,
  Grid,
  Button,
} from "@material-ui/core";
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import { PokemonOverviewCard } from "./PokemonOverviewCard";
import {Loading} from "./Loading";
import {Context} from '../Context/Context'

export const Content: FunctionComponent = () => {
  const context = useContext(Context)

  const [loadCounter, setLoadCounter] = useState<boolean>(false);

  const loadMore = async () => {
    await setLoadCounter(true);
    await context.loadAllPokeDetails();
    await setLoadCounter(false)

  } 

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsMounted(true);
      // setIsMounted(false);
      setLoadCounter(true)
      await context.loadAllPokeDetails();
      setLoadCounter(false);
      // setIsMounted(true)
    };
    fetchData()

    return () => {
      setIsMounted(false)
    }
  }, []);

  
console.log(context)

  return (
    <Box id='content' m={3} component="span" >
      <Grid container spacing={10} max-width="xl" component="span" >
      
          {context.allPokemonDetails.length > 10 ?
            context.allPokemonDetails.map((item, i) => {
            
          return (
           
            <PokemonOverviewCard 
              title={item.name}
              image={item.sprites.other.dream_world.front_default}
              key={i}
              background={"../Graphics/Background/bg.jpg"}
              component={PokemonOverviewCard}
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
