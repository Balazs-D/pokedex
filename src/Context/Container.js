import React, { Fragment, useState } from "react";
import { Context } from "./Context";

const Container = (props) => {
  const [allPokemonList, setAllPokemonList] = useState([]);
  const [allPokemonDetails, setAllPokemonDetails] = useState([]);

  return (
    <Context.Provider
      value={{
        allPokemonList,
        setAllPokemonList,
        allPokemonDetails,
        setAllPokemonDetails,
      }}
    >
      <Fragment>{props.children}</Fragment>
    </Context.Provider>
  );
};

export default Container;
