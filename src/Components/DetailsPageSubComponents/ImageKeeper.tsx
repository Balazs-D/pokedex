import React, { FunctionComponent } from "react";
import {
  Typography,
} from "@material-ui/core";
import { makeStyles  } from '@material-ui/core/styles';
import {pokemonStyleColor} from '../../HelperFunctions/StyleFunctions'

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
  ImgBox: {
    borderRight: "1px solid black",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    minWidth: "30%",
    [theme.breakpoints.down('xs')]: {
      borderRight: "0px solid black",
      borderBottom: "1px solid black",
    }

  },
  TitleBox: {
    margin: '.5vw'
  },
  Image: {
    width:"15vw",
    maxHeight: "18vw",
    margin: "1vw"
  }
}));

interface Pokemon {
  types: any[];
  order: number | string;
  type: string;
  name: string
};

interface Sprite {
  sprite: string
};

interface PokemonProps {
  pokemon: Pokemon;
  sprite: Sprite
  
};

  
export const ImageKeeper: FunctionComponent<PokemonProps> = (props: PokemonProps) => {
  const classes = useStyles();
  const { name, order, types } = props.pokemon;
  const sprite  = props.sprite.toString();
  const bg = pokemonStyleColor(types[0].type.name);
  return (
  

      <div className={classes.ImgBox} style={{ background: bg }}>
           
      <div className={classes.TitleBox}>
        <Typography variant='h2'>
                {name.toUpperCase()}
              </Typography>
                <Typography align='right' variant='h5'>#{order}</Typography>
                </div>
      <img className={classes.Image} src={sprite} alt={name}  />
           
          </div>
        
  )
}
 
  

