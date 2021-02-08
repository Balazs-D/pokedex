import React, { FunctionComponent, Fragment, useState } from "react";
import { Context } from "./Context";

const Container: FunctionComponent = (props) =>  {
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"
  );
  const [urlEvolution, setUrlEvolution] = useState<string>(
    "https://pokeapi.co/api/v2/evolution-chain?offset=0&limit=21",
  );
  const [allPokemonDetails, setAllPokemonDetails] = useState<any>([]);
  const [soloPokemon, setSoloPokemon] = useState<any>();
  const [evolution, setEvolution] = useState<any>([]);
  const [allEvolutions, setAllEvolutions] = useState<any>([]);

  

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
        let response = await fetch(data.results[i].url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let dataIteration = await response.json();
        setAllPokemonDetails(prev => (prev.concat(dataIteration))) 
      }
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
      console.log(evoData)

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
    >
      <Fragment>{props.children}</Fragment>
    </Context.Provider>
  );
};

export default Container;
