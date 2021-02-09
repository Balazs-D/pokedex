import React, { FunctionComponent, useContext, useEffect, useState, ReactNode } from "react";
import styled from 'styled-components';
import {
  Box,
  Typography,
  LinearProgress
} from "@material-ui/core";


const InfoBox = styled(Box)`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 2vw
`
const LeftPanelBox = styled(Box)`
display: flex;
flex-direction: column;
height: 10%;
`
  
const BoxSpan = styled(Box)`
margin: 0vw;
display: flex;
flex-direction: column;
padding: 0 2vw;
margin: 0 2vw;
`;

const EvolutionBox = styled(Box)`
display: flex;
flex-direction: column;
border: 1px solid black;
border-radius: 5vw;
background: pink
`;

const Img = styled.img`
width: 5vw;
margin: 1vw;
`



export const Infos =  (props) => {

  

  

  
  console.log(props.evolution)


  return (
   <Box>
    <InfoBox>
      <LeftPanelBox>
          <BoxSpan><Typography variant='h5'>Abilities</Typography>
              <Box mb={3}>
                {props.selectedPokemon.abilities.map((item, i) => {
                  return <Typography key={i} variant='body1'>{item.ability.name}</Typography>
                })}
          </Box></BoxSpan>
          
          
          <BoxSpan> <Box mb={3}>
                <Typography variant='h5'>Types</Typography>
                {props.selectedPokemon.types.map((item, i) => {
                  return <Typography key={i} variant='body1'>{item.type.name}</Typography>
                })}
          </Box></BoxSpan>
      </LeftPanelBox>  
          
          <BoxSpan> <Box mb={3}>
              <Typography  variant='h5'>Stats</Typography>
                {props.selectedPokemon.stats.map((item, i) => {
                  return (<Box mb={1}><Typography key={i} variant='body1'>{item.stat.name}: {item.base_stat}</Typography>
                    <LinearProgress variant="determinate" value={item.base_stat} /></Box>)
                })}
              </Box>
             </BoxSpan>
             
           
              
            
      </InfoBox>
      
     <EvolutionBox >
              <Box display='flex' >
              <Typography align='right' variant='h5'>{props.evolution.chain.species.name}</Typography>
              {props.evolution.chain.evolves_to.length > 0 && <Typography align='right' variant='h5'>{props.evolution.chain.evolves_to[0].species.name}</Typography>}
              {props.evolution.chain.evolves_to.length > 0  && props.evolution.chain.evolves_to[0].evolves_to.length > 0 &&<Typography align='right' variant='h5'> {props.evolution.chain.evolves_to[0].evolves_to[0].species.name}</Typography>}
              </Box>
              <Box>
              {props.evolutionImages.map((item, i) => { return <Img key={i} src={item.sprites.other.dream_world.front_default} />})}</Box>
                
              </EvolutionBox>
    
    </Box>
  )
  
}
 
  

