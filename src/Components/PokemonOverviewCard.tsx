import React, { FunctionComponent, ReactNode } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Chip,
  SvgIcon
} from "@material-ui/core";
import {pokemonStyleColor} from './HelperFunctions/StyleFunctions'
import { withStyles } from "@material-ui/core/styles";

withStyles({
 
  cardAction: {
    borderRadius: 5,
    border: 1,
    borderColor: "black",
    background: "red"
  },
  id: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16

  },

  bg: {
    opacity: 0.05
  }
});

interface CardProps {
  title: string,
  image: string,
  typeOne: string, 
  typeTwo: string,
  background: string,
  component: ReactNode,
  id: number
  
}




export const PokemonOverviewCard: FunctionComponent<CardProps> = ({ title, image, id, typeOne, typeTwo }) => {
  return (
    <Grid item xs={4} >
      <Box border={1} borderRadius={5} borderColor="text.primary">
      <Card >
        <CardActionArea >
          <Box style={{ height: 220 }}
           
            display="flex" 
            alignItems="center"
            justifyContent="center"
            borderBottom={1}
            bgcolor={pokemonStyleColor(typeOne)}
            >
          
              <CardMedia
                className='media'
                style={{width: 120,}}
                image={image}
                title={title}
                component="img"
                
            />
  
             {/* --------------- Pokemon Styles Stats  */}
             <Typography variant="body1" >
              <Box
                display='flex'
                flexDirection="column"
                justifyContent='flex-start'
                style={{ position: "absolute", top: 15, left: 15,  }} > 

                    {[typeOne, typeTwo].map((item, i) => {
                      if(item.length > 0){
                        return (
                        <Box mb={1} pl={1} pr={1} border={1} borderRadius={5}  bgcolor='#fff' >
                        {item}
                        </Box>)}
                    })}
           
                </Box>
            </Typography>
            
            {/* --------------- Pokemon ID  */}
              <Typography variant="h5" color="textPrimary" component="h2" >
              <Box
                p={1}
                border={1}
                borderRadius={5}
                style={{ position: "absolute", top: 15, right: 15 }}
                bgcolor='#fff'
              >
                #{id}
              </Box>
              </Typography>
          </Box>

        </CardActionArea>
        <Box  height={1}>
            <Typography
              variant="h5"
              color="textPrimary"
              component="h2" >
              
                <Box textAlign="center" m={2} display='block' >
                {title.toUpperCase()}
                </Box>
              
          </Typography>
          </Box>
      </Card>
      </Box>
    </Grid>
  )
}
 
  

