import React, { FunctionComponent, useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {pokemonStyleColor} from '../HelperFunctions/StyleFunctions'
import { useHistory } from "react-router-dom";
import { Context } from '../Context/Context';

const useStyles = makeStyles(theme => ({
  ImageCont: {
    height: 220,
    display:"flex", 
    alignItems: "center",
    justifyContent: "center",
    borderBottom: '1px solid black'
  },
  TitleCont: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    position: "absolute",
    top: 15,
    left: 15,
  },
  IdCont: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'flex-start',
    position: "absolute",
    top: 15,
    right: 15,
    background: '#fff',
    border: '1px solid black',
    borderRadius: 5,
    padding: 5
  }, 
  BoxHover: {
    border: '1px solid black',
    borderRadius: 5,
    boxShadow: '5px 5px 15px grey',
    '&:hover': {
      boxShadow: '1px 1px 3px grey'
   },
  }
}));

interface CardProps {
  title: string,
  image: string,
  typeOne: string, 
  typeTwo: string,
  id: number,
  
};

export const PokemonOverviewCard: FunctionComponent<CardProps> = (CardProps) => {
  const {
    title,
    image,
    typeOne,
    typeTwo,
    id } = CardProps;
  const history = useHistory();
  const context = useContext(Context)
  const classes = useStyles();
  const bg = pokemonStyleColor(typeOne);

  

  return (
    
    <Grid item xs={12} lg={4} id='pokeOverview'>
      <div className={classes.BoxHover} onClick={() => history.push(`/${id}`)}>
        <Card onClick={() => {
          context.loadSelectedPokemon(id); context.loadPokemonEvolution(id)
        }}>
        <CardActionArea >
          <div className={classes.ImageCont} style={{background: bg }}>
          
              <CardMedia
                className='media'
                style={{width: 120}}
                image={image}
                title={title}
                component="img"
                
            />
             {/* --------------- Pokemon Styles Stats  */}
              <div className={classes.TitleCont}
                > 
                    {[typeOne, typeTwo].map((item, i) => { if(item.length > 0){
                        return (
                          <Box key={i} mb={1} pl={1} pr={1} border={1} borderRadius={5} bgcolor='#fff' >
                              <Typography variant="body2" >{item}</Typography>
                       
                        </Box>)}
                    })}
           
                </div>
            
              {/* // --------------- Pokemon ID // */}
            
              <Typography variant="h5" color="textPrimary" component="h2" >
              <div className={classes.IdCont}
              >
                #{id}
              </div>
                </Typography>
          </div>
              {/* // --------------- Pokemon Name // */}

        </CardActionArea>
        <Box height={1}>
            <Typography
              variant="h5"
              color="textPrimary"
              >
              
                <Box textAlign="center" m={2} display='block' >
                {title.toUpperCase()}
                </Box>
              
          </Typography>
          </Box>
        </Card>
        </div>
      </Grid>
  )
}
 
  

