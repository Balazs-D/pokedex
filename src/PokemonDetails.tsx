import React, { FunctionComponent, useContext, useEffect, useState, ReactNode } from "react";
import styled from 'styled-components';
import { Route } from 'react-router-dom'
import {Context} from './Context/Context'
import {
  Box,
  Button,
  Typography,
  
} from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {pokemonStyleColor} from './Components/HelperFunctions/StyleFunctions'
import { useHistory } from "react-router-dom";
import { Moves } from './Components/DetailsPageSubComponents/Moves';
import {Loading} from "./Components/Loading";

import NavTabs from './Components/DetailsPageSubComponents/TestTab'
import CustomizedTabs from './Components/DetailsPageSubComponents/Test2'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1vw',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const DetailsCont = styled(Box)`
width: 70vw;
height: 70vh;
margin-top: 5%;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start ;
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
border-right: 1px solid black;
position: relative;
display: flex;
flex-direction: column;
align-items: center; 
justify-content: space-around;
width: 40%;
overflow: hidden;
`
const TitleBox = styled(Box)`
top: 0;
left: 50%;
margin: .5vw;
transform: (trans)
`
const MainImage = styled.img`
width: 15vw;
max-height: 18vw;
margin: 1vw;
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
width: 20%;
display: flex;
flex-direction: column;
margin: 2vw;
`
const MovesBox = styled(InfoBox)`
width: 40%;
margin-left: 0;
display: flex;
`
const BoxSpan = styled(Box)`
margin: 0vw;
display: flex;
flex-direction: column;
`
  ;
  
// export interface Move<T> {
//     children: (item: T) => ReactNode,
//     items: T[],
//     value: T,
//     id: (value: T) => string | number;
//     moveArr: (value: T) => React.ReactNode;
//     move: (value: T) => string
// };



export const PokemonDetails: FunctionComponent = () => {
  const history = useHistory();
  const context = useContext(Context)
  const [mounted, setMounted] = useState<boolean>(false);
  const classes = useStyles();

  

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
      context.setEvolution([]);
      setMounted(false);
    }
  }, []);

  
  const fetchEvolutionImgs = () => {
    
    let arr = [];
    context.allPokemonDetails.map((item) => {
      if (item.name == context.evolution[0].chain.species.name) {
        arr.push(item)
      } else if (context.evolution[0].chain.evolves_to.length > 0 && item.name == context.evolution[0].chain.evolves_to[0].species.name) {
        arr.push(item)
      } else if (context.evolution[0].chain.evolves_to.length > 0 && context.evolution[0].chain.evolves_to[0].evolves_to.length > 0 && item.name == context.evolution[0].chain.evolves_to[0].evolves_to[0].species.name) {
        arr.push(item)
      }
    });
  
    return arr
  };

  console.log(context.evolution)

  return (
    <DetailsCont>

      {context.soloPokemon[0] &&
     <>
          <Box mb={1} >
          <Button onClick={() => { history.goBack() }} color="primary">Go Back</Button>
          </Box>
        
        <DetailsKeeper>
        
        
            <ImgBox bgcolor={pokemonStyleColor(context.soloPokemon[0].types[0].type.name)}>
           
              <TitleBox><Typography variant='h2'>
                {context.soloPokemon[0].name.toUpperCase()}
              </Typography>
                <Typography align='right' variant='h5'>#{context.soloPokemon[0].order}</Typography></TitleBox>
              <MainImage src={context.soloPokemon[0].sprites.other.dream_world.front_default} />
            {/* {context.evolution.length > 0 && <EvolutionBox >
              <Box display='flex' >
              <Typography align='right' variant='h5'>{context.evolution[0].chain.species.name}</Typography>
              <Typography align='right' variant='h5'>{context.evolution[0].chain.evolves_to[0].species.name}</Typography>
              <Typography align='right' variant='h5'> {context.evolution[0].chain.evolves_to[0].evolves_to[0].species.name}</Typography>
              </Box>
              <Box>
              {fetchEvolutionImgs().map((item, i) => { return <Img key={i} src={item.sprites.other.dream_world.front_default} />})}</Box>
                
              </EvolutionBox>} */}
          </ImgBox>
          {context.evolution.length > 0 ? <NavTabs evolutionImages={fetchEvolutionImgs()} evolution={context.evolution[0]}/> : <Loading pokemonArray={context.allPokemonDetails.length} /> }
          
         
       
    
        </DetailsKeeper>
          </>}
    </DetailsCont>
  )
}
 
  

