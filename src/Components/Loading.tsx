import React, { FunctionComponent, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography
} from "@material-ui/core";



interface LoadingProps {
  pokemonArray: number
}

export const Loading: FunctionComponent<LoadingProps> = ({pokemonArray}) => {
  

  
  return (
    <Box
      m='auto'
      position="relative"
      display="inline-flex"
      alignItems="center"
      height="100vh"
    ><CircularProgress  value={pokemonArray * 100} />
       <Box
        top={2}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="h1" color="textSecondary">{(pokemonArray)*10 + "%" }</Typography>
      </Box>
  </Box>
    
   
      
  );
};


