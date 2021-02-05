import React, { FunctionComponent, ReactNode } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardHeader
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
const BG = require("../Graphics/Background/bg.jpg");

withStyles({
 
  cardAction: {
    borderRadius: 5,
    border: 1,
    borderColor: "black",
    background: "red"
  },
  media: {
    // height: "300px",
    // width: "100",

  },

  bg: {
    opacity: 0.1
  }
});

interface CardProps {
  title: string,
  image: string,
  index: number,
  background: string,
  component: ReactNode
  
}

export const PokemonOverviewCard: FunctionComponent<CardProps> = ({title, image, index, background}) => {
  return (
    <Grid item key={index} xs={3}>
      <Card >
        <CardActionArea >
          
          <Typography variant="h4" color="textPrimary" component="h2" >
          <Box textAlign="center" m={1}>
              {title
                .charAt(0).toUpperCase() +
                title.slice(1)
              }
          </Box>
          </Typography>
        
        <CardMedia image={'https://pbs.twimg.com/media/DVMT-6OXcAE2rZY.jpg'} >
          
          <Box style={{backdropFilter: 'blur(5px) brightness(250%) '}} boxShadow={3}>
         
         <Box style={{height: 400}} display="flex" 
       
        alignItems="center"
        justifyContent="center">
        <CardMedia
                  className='media'
                  style={{width: 200}}
          image={image}
          title={title}
          component="img"
                />
              </Box>
            </Box>
      </CardMedia>
    </CardActionArea>
    </Card>
    </Grid>
  )
}
 
  

