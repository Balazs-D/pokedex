import React, { FunctionComponent, Fragment, useState } from "react";
import  { Context } from "./Context";




export interface ContextInterface {
  url?: string;
  urlEvolution?: string;
  allPokemonDetails?: any[];
  soloPokemon?: any[];
  evolution?: any[];
  allEvolutions?: any[];
};

const Container: FunctionComponent<ContextInterface> = (ContextInterface) =>  {
  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"
  );
  const [urlEvolution, setUrlEvolution] = useState(
    "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=21",
  );
   const [allPokemonDetails, setAllPokemonDetails] = useState<any>([]);
  const [soloPokemon, setSoloPokemon] = useState();
  const [evolution, setEvolution] = useState([]);
  const [allEvolutions, setAllEvolutions] = useState([]);

  

   const loadAllPokeDetails = async () => {
    try {
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      setUrl(data.next)
      if (data) {
  
        try {
           // Loop through recent fetched data for details url
          for (let i = 0; i < data.results.length; i++) {
          let response = await fetch(data.results[i].url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          let dataIteration = await response.json();
          setAllPokemonDetails(prev => (prev.concat(dataIteration))) 
        } 
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)

    }
   

  };

  const loadSelectedPokemon = async (id) => {
    setSoloPokemon(allPokemonDetails.filter(item => item.id === id));
 };

  const loadPokemonEvolution = async (name) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
    
    let data = await response.json();
    let res = await fetch(data.evolution_chain.url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let evoData = await res.json()
      setEvolution([evoData]);

    // }
  };

  

  return (
    <Context.Provider
      value={{
        url,
        setUrl,
        allPokemonDetails,
        setAllPokemonDetails,
        loadAllPokeDetails,
        loadSelectedPokemon,
        soloPokemon, setSoloPokemon,
        evolution, setEvolution,
        loadPokemonEvolution,
        allEvolutions, setAllEvolutions,
        urlEvolution, setUrlEvolution
      }}

      {...ContextInterface}
    >
      <Fragment>{ContextInterface.children}</Fragment>
    </Context.Provider>
  );
};

export default Container;
