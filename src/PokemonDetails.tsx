import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import styled from 'styled-components';
import { Route } from 'react-router-dom'
import {Context} from './Context/Context'
import {
  Box,
  Button,
  Typography,
  Grid,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import {pokemonStyleColor} from './Components/HelperFunctions/StyleFunctions'
import { useHistory } from "react-router-dom";

const DetailsCont = styled(Box)`
width: 70vw;
height: 70vh;
margin-top: 5%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: center
`;

const DetailsKeeper = styled(Box)`
border: 1px solid black;
border-radius: .5vw;
width: 100%;
height: 100%;
display: flex;
flex-direction: row;
overflow: hidden
`
const ImgBox = styled(Box)`
position: relative;

display: flex;
flex-direction: column;
align-items: center; 
justify-content: space-around;
width: 40%;
overflow: hidden;
`
const TitleBox = styled(Box)`
/* position: absolute; */
top: 0;
left: 50%;
margin: .5vw;
transform: (trans)
`
const Img = styled.img`
width: 5vw;
margin: 1vw;
`
const EvolutionBox = styled(Box)`
display: flex;
flex-direction: column;
border: 1px solid black;
border-radius: 5vw;
background: pink

`

const InfoBox = styled(Box)`
width: 30%;
margin: 2vw`







export const PokemonDetails: FunctionComponent = () => {
  const history = useHistory();
  const context = useContext(Context)
  const [mounted, setMounted] = useState<boolean>(false);
  

  useEffect(() => {
    setMounted(false);
    if (context.soloPokemon[0]) {
        async function fetchEvolution() {
        await context.loadPokemonEvolution(context.soloPokemon[0].name );
        await setMounted(true);
      }
      fetchEvolution();

    }
    return () => {
      context.setSoloPokemon([]);
      setMounted(false);
    }
  }, []);

  
  const fetchEvolutionImgs = () => {
    
    let arr = [];
    context.allPokemonDetails.map((item) => {
      if (item.name == context.evolution[0].chain.species.name) {
        arr.push(item)
      } else if (item.name == context.evolution[0].chain.evolves_to[0].species.name) {
        arr.push(item)
      } else if (item.name == context.evolution[0].chain.evolves_to[0].evolves_to[0].species.name) {
        arr.push(item)
      }
    });
  
    return arr
  };

  console.log(context.evolution)

  return (
    <DetailsCont>

      {context.soloPokemon[0] &&
        <> <Box mb={1} >
          <Button onClick={() => { history.goBack() }} color="primary">Go Back</Button>
        </Box>
        
          <DetailsKeeper>
            <ImgBox bgcolor={pokemonStyleColor(context.soloPokemon[0].types[0].type.name)}>
           
              <TitleBox><Typography variant='h2'>
                {context.soloPokemon[0].name.toUpperCase()}
              </Typography>
                <Typography align='right' variant='h5'>#{context.soloPokemon[0].order}</Typography></TitleBox>
              <img src={context.soloPokemon[0].sprites.other.dream_world.front_default} />
            {context.evolution.length > 0 && <EvolutionBox >
              <Box display='flex' >
              <Typography align='right' variant='h5'>{context.evolution[0].chain.species.name}</Typography>
              <Typography align='right' variant='h5'>{context.evolution[0].chain.evolves_to[0].species.name}</Typography>
              <Typography align='right' variant='h5'> {context.evolution[0].chain.evolves_to[0].evolves_to[0].species.name}</Typography>
              </Box>
              <Box>
              {fetchEvolutionImgs().map((item, i) => { return <Img key={i} src={item.sprites.other.dream_world.front_default} />})}</Box>
                
              </EvolutionBox>}
            </ImgBox>
            <InfoBox  > 
            
          
              <Typography variant='h5'>Abilities</Typography>
              <Box mb={3}>
                {context.soloPokemon[0].abilities.map((item, i) => {
                  return <Typography variant='body1'>{item.ability.name}</Typography>
                })}
              </Box>
              <Box mb={3}>
                <Typography variant='h5'>Types</Typography>
                {context.soloPokemon[0].types.map((item, i) => {
                  return <Typography variant='body1'>{item.type.name}</Typography>
                })}
              </Box>
              <Box mb={3}>
                <Typography variant='h5'>Stats</Typography>
                {context.soloPokemon[0].stats.map((item, i) => {
                  return <Typography variant='body1'>{item.stat.name}: {item.base_stat}</Typography>
                })}
              </Box>
              <Box mb={3}>
           
              </Box>
            
            </InfoBox>
    
            <InfoBox border={1}>
              <Typography variant='h5'>Moves</Typography>
              <Grid container
                wrap="wrap"
                direction="column"
                justify="center"
                alignItems="flex-start"
             
              >
                {context.soloPokemon[0].moves.map((item, i) => {
                  return <Grid item xs> <Typography variant='body1'>{item.move.name}</Typography></Grid>
                })}
              </Grid>
            </InfoBox>
     
       
    
          </DetailsKeeper></>}
    </DetailsCont>
  )
}
 
  

