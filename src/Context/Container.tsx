import React, { FunctionComponent, Fragment, useState } from "react";
import { Context } from "./Context";

// interface contextProps {
//   url: string
//   allPokemonDetails: any
// }

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

    let responseEvolution = await fetch(urlEvolution, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let dataEvolution = await responseEvolution.json();
    console.log(dataEvolution)
    setAllEvolutions(prev => prev.concat(dataEvolution))
    setUrlEvolution(dataEvolution.next)
  };

  const loadSelectedPokemon = async (id) => {

    setSoloPokemon(allPokemonDetails.filter(item => item.order === id));
   
    //   let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // let data = await response.json();
    // setSoloPokemon(prev => (prev.concat(data)));
    // return response.json()
    
    // let resEvolution = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // let dataEvolution = await resEvolution.json();
    // setEvolution(dataEvolution);
    // console.log(data)
    
     
    
  };

  const loadPokemonEvolution = async (id, targetPokemon) => {
  console.log(id, targetPokemon)
    
    for (let i = 0; i < allPokemonDetails.length; i++){
       if (allPokemonDetails[i].name == targetPokemon) {
         console.log(allPokemonDetails[i].id);
        
      }
    }

    // for (let i = 1; i <= allPokemon; i++) {
      let response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      setEvolution([data]);
      console.log(data)

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
