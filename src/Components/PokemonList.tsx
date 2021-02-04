import React, { useEffect, useState, FunctionComponent } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Box,
  Grid,
  
} from "@material-ui/core";
import {  PokemonOverviewCard } from "./PokemonOverviewCard";

const BG = require("../Graphics/Background/bg.jpg");

export const Content: FunctionComponent = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);

  
 
  const [offset, setOffset]= useState(0); 
  const [currentPage] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  const pokemonList = async () => {

    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        setAllPokemon(allPokemon.concat(data.results)); 
               
      }
     })
    .catch(console.log)
setOffset(offset + 20)
    
  
    
    
   
  };
  console.log(allPokemon)


  useEffect(() => {
    async function fetchData() {
      await pokemonList();
    }
    fetchData();
  }, [currentPage]);

  return (
    <Box m={3} component='span'>
              <InfiniteScroll  hasMore={true} next={pokemonList} dataLength={allPokemon.length} loader={<p>Loading...</p>}>

      <Grid container spacing={10} max-width="xl" component="span" >
      {allPokemon &&
        Object.keys(allPokemon).map((item, i) => {
          return (
            <PokemonOverviewCard 
              title={
                allPokemon[item].name.charAt(0).toUpperCase() +
                allPokemon[item].name.slice(1)
              }
              image={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${allPokemon[item].name}.png`}
              key={i}
              index={i}
              background={"../Graphics/Background/bg.jpg"}
              component={PokemonOverviewCard}
            />
          );
        })}
        </Grid> 
        </InfiniteScroll>

      </Box>
  );
};

export default Content;
