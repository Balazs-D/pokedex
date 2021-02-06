import React, { useEffect, useState, useContext, FunctionComponent, useCallback } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import {
  Box,
  Grid,
  Button
} from "@material-ui/core";
import { PokemonOverviewCard } from "./PokemonOverviewCard";
import {Context} from '../Context/Context'
const BG = require("../Graphics/Background/bg.jpg");

export const Content: FunctionComponent = () => {
  const context = useContext(Context)
  const [allPokemon, setAllPokemon] = useState([]);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);
  const [offset, setOffset] = useState(0); 
  const [pokeMeta, setPokeMeta] = useState([]); 
  const [evoGroups, setEvoGroups] =useState([])
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=21&offset=0")
  let pokeCache = []

// ---------------------------- Pokemon Name + URl 
  const pokemonList = async () => {
    // let url = `https://pokeapi.co/api/v2/pokemon?limit=21&offset=${offset}`;
    // pokeCache = [];
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // pokes.push(data.results)
          setUrl(data.next)
          setPokeMeta(prev => (prev.concat(data)))
          setAllPokemon(prevPokemons => (prevPokemons.concat(data.results)));
          

          for (let i = 0; i < data.results.length; i++) {
           
            // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
            fetch(data.results[i].url)
              .then((response) => response.json())
              .then((data) => {
                    
                if (data) {
                  pokeCache.push(data);
                  console.log(typeof(data))
                  
                  // setAllPokemonDetails([prev => (prev.concat(data))])
                  setAllPokemonDetails(prev => (prev.concat(data)))
                setAllPokemonDetails(pokeCache)
                        
                }
              })
              .catch(console.error)
                
          }

         
    
    
     
  

        };
      })
  }
  console.log(allPokemonDetails)
  // ----------------- Call next group (20) of Pokemons
  const next = (off) => {
    setOffset(prev => prev + 21)


    { for (let i = off; i <= off + 21; i++){
      // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
      fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
        .then((response) => response.json())
        .then((data) => {
        
          if (data) {
            // pokeCache.push(data);
            setAllPokemonDetails(prev => {return (prev.concat(data))})
            Array.from(new Set(allPokemonDetails))

          }
        })
      .catch(console.error)
    }
      setOffset(prev => prev + 20)
}



    // if (Object.values(pokeMeta)[0]) {
    //   console.log(offset)
    // let url = `https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`;  
    //   // let url = Object.values(pokeMeta)[offset];
    //   console.log(url)
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data) {
    //       // setPokeMeta(data)
    //       // setAllPokemon(prevPokemons => (prevPokemons.concat(data.results)));
    //       console.log(allPokemon)
    //       console.log(data.results)

    //       for (let i = 0; i < data.results.length; i++) {
    //         fetch(data.results[i].url)
    //           .then((response) => response.json())
    //           .then((data) => { 
    //             if (data) {
    //               pokeCache.push(data);
    //               setAllPokemonDetails(prev => (prev.concat(data)))     
    //             }
    //           })
    //           .catch(console.error) 
    //       }
    //       setOffset(offset+20)
    //       console.log(offset)
    //     };
    //   })

    // }
  }

 
  
// ---------------------------- Pokemon Details

//   const pokemonDetails = async () => {
//   { for (let i = offset; i <= offset + 21; i++){
//       // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
//       fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
//         .then((response) => response.json())
//         .then((data) => {
        
//           if (data) {
//             // pokeCache.push(data);
//             // setAllPokemon(prev => (prev.concat(data)))
//             setAllPokemonDetails(prev => (prev.concat(data)))
//           }
//         })
//       .catch(console.error)
//     }
     
// }
// }

  
  const nextGroup = () => {
    if (allPokemonDetails.length % 21) {
      for (let i = allPokemonDetails.length; i <= allPokemonDetails.length + 21; i++){
        // fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
        fetch('https://pokeapi.co/api/v2/pokemon/' + i.toString() + '/')
          .then((response) => response.json())
          .then((data) => {
          
            if (data) {
              let curr = data
              // pokeCache.push(data);
              setAllPokemonDetails(prev => (prev.concat(data)))
              // setAllPokemonDetails(allPokemon.concat(data))
              
            }
          })
        .catch(console.error)
      }

       
  
    }
    console.log(allPokemonDetails)

  }

  

  useEffect(() => {
    async function fetchData() {
      await pokemonList();
      // await pokemonDetails();
      


    }
    fetchData();
   
  }, []);

  // useEffect(() => {
  //   async function callNext() {
  //     await next();
  //     // await pokemonDetails();
  //   }
  //   callNext();
  // }, [offset]);

  


  return (
    <Box m={3} component='span'>
      {/* <InfiniteScroll
        pageStart={0}
        loadMore={()=>{nextGroup()}}
        hasMore={true}
        loader={<div className="loader" key={0}>Loading ...</div>}
> */}
        <Grid container spacing={10} max-width="xl" component="span" >
          
          {allPokemonDetails &&
            allPokemonDetails.map((item, i) => {
            
          return (
            
            <PokemonOverviewCard 
              title={item.name}
              image={item.sprites.other.dream_world.front_default}
              key={i}
              index={i}
              background={"../Graphics/Background/bg.jpg"}
              component={PokemonOverviewCard}
            />
        );
        })}
      </Grid> 
      <Button variant="contained" color="primary" onClick={() => {pokemonList()}}>Next</Button>
        {/* </InfiniteScroll> */}

      </Box>
  );
};

export default Content;
