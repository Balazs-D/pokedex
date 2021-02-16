import React, { FunctionComponent, useContext, useEffect, useState } from "react";
import { Context } from '../Context/Context'
import {
  Box,
  Button,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import { getEvolutionImgs } from '../HelperFunctions/EvolutionDetails'
import { ImageKeeper } from './DetailsPageSubComponents/ImageKeeper';
import { Loading } from "./Loading";
import { DetailsTabs } from './DetailsPageSubComponents/DetailsTabs'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    [theme.breakpoints.down('xs')]: {
      height: "auto",
      marginBottom: "2vh"
    }
  },
  content: {
    border: "1px solid black",
    borderRadius: ".5vw",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "row",
    overflow: 'hidden',

    [theme.breakpoints.down('xs')]: {
      flexDirection: "column",
    }
  }

}));


export const PokemonDetails: FunctionComponent = () => {
  const history = useHistory();
  const context = useContext(Context)
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentPokemon] = useState<any[]>(context.soloPokemon)
  const classes = useStyles();

  useEffect(() => {

    // Fetch evolution array of the selected pokemon
    // Only if selected pokemon already loaded

    setMounted(false);
    if (context.soloPokemon[0]) {
      async function fetchEvolution() {
        await context.loadPokemonEvolution(context.soloPokemon[0].name);
        await setMounted(true);
      }
      fetchEvolution();

    }
    return () => {
      context.setSoloPokemon([]);
      context.setEvolution([]);
      setMounted(false);
    }

    // eslint-disable-next-line
  }, []);


  return (
    <div className={classes.root}>

      {currentPokemon[0] &&
        <>
          <Box>
            <Button onClick={() => { history.goBack() }} color="primary">Go Back</Button>
          </Box>

          <div className={classes.content}>
            <ImageKeeper pokemon={currentPokemon[0]} sprite={currentPokemon[0].sprites.other.dream_world.front_default} />
            {context.evolution.length > 0 ?
              <DetailsTabs
                images={getEvolutionImgs(context.allPokemonDetails, context.evolution[0])}
                abilities={currentPokemon[0].abilities}
                moves={currentPokemon[0].moves}
                stats={currentPokemon[0].stats}
                types={currentPokemon[0].types}

              />
              :
              <Loading pokemonArray={context.evolution.length} />
            }
          </div>
        </>}
    </div>
  )
}



