import React, { useEffect, useState, useContext, FunctionComponent, useRef } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {
  Box,
  Grid,
} from "@material-ui/core";
import { PokemonOverviewCard } from "./PokemonOverviewCard";
import {Context} from '../Context/Context'
const BG = require("../Graphics/Background/bg.jpg");

export const Content: FunctionComponent = () => {
  const context = useContext(Context)
  const [allPokemon, setAllPokemon] = useState([]);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [offset, setOffset] = useState(1); 
  const [pokeMeta, setPokeMeta] = useState([]); 

  let pokeCache = []
  let pokes = []

// ---------------------------- Pokemon Name + URl 
  const pokemonList = async () => {
    let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${0}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // pokes.push(data.results)
          setPokeMeta(prev => (prev.concat(data)))
          setAllPokemon(prevPokemons => (prevPokemons.concat(data.results)));
          

          for (let i = 0; i < data.results.length; i++) {
           
            // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
            fetch(data.results[i].url)
              .then((response) => response.json())
              .then((data) => {
                    
                if (data) {
                  pokeCache.push(data);
                  setAllPokemonDetails(prev => (prev.concat(data)))
                        
                }
              })
              .catch(console.error)
                
          }
    
    
     
  

        };
      })
  }
  
  const next = () => {
    if (Object.values(pokeMeta)[0]) {
      // let url = Object.values(pokeMeta)[offset].next;
      // console.log(url)

      let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

        // console.log(Object.values(allPokemon)[1])
      
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // pokes.push(data.results)
          setPokeMeta(data)
          setAllPokemon(prevPokemons => (prevPokemons.concat(data.results)));
          

          for (let i = 0; i < data.results.length; i++) {
           
            // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
            fetch(data.results[i].url)
              .then((response) => response.json())
              .then((data) => {
                    
                if (data) {
                  pokeCache.push(data);
                  setAllPokemonDetails(prev => (prev.concat(data)))
                        
                }
              })
              .catch(console.error)
                
          }
          
          console.log(offset)
          setOffset(prev => prev + 20)
    
     
  

        };
      })
   }
  }

 
  
// ---------------------------- Pokemon Details

//   const pokemonDetails = async () => {
//     let currOff = 1;
//     if (offset !== 1) { currOff = currOff + 20 }
    
    
//       for (let i = currOff; i < currOff + 20; i++){
//       // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
//       fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
//         .then((response) => response.json())
//         .then((data) => {
        
//           if (data) {
//             pokeCache.push(data);
//             setAllPokemonDetails(prev => (prev.concat(data)))
            
//           }
//         })
//       .catch(console.error)
    
// }
    
//     console.log(Object.keys(pokeCache))
//   }
  

  
// useEffect(()=>{setAllPokemonDetails(pokeCache)},[end])

  useEffect(() => {
    async function fetchData() {
      await pokemonList();
      // await pokemonDetails();
     

    }
    fetchData();
   
  }, []);

  useEffect(() => {
    async function callNext() {
      await next();
      // await pokemonDetails();
     

    }
    callNext();
   
  }, [offset]);

  
  const incOffset = () => {
    setOffset(curr=>curr+20)
}
  

  return (
    <Box m={3} component='span'>
      <InfiniteScroll
        pageStart={0}
        loadMore={()=>next()}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
>
      <Grid container spacing={10} max-width="xl" component="span" >
      {allPokemonDetails &&
            allPokemonDetails.map((item, i) => {
          //  console.log(item)
          return (
            
            <PokemonOverviewCard 
              title={item.name
                // pokeCache[item].name.charAt(0).toUpperCase() +
                // pokeCache[item].name.slice(1)
              }
              // image={`https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${allPokemon[item].name}.png`}
              image={item.sprites.other.dream_world.front_default}
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
