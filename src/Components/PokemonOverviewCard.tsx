import React, { FunctionComponent, ReactNode, useContext } from "react";
import styled from 'styled-components';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
} from "@material-ui/core";
import {pokemonStyleColor} from './HelperFunctions/StyleFunctions'
import { useHistory } from "react-router-dom";
import { Context } from '../Context/Context';


interface CardProps {
  title: string,
  image: string,
  typeOne: string, 
  typeTwo: string,
  background: string,
  component: ReactNode,
  id: number,
  
};

const BoxHover = styled(Box)`
	box-shadow: 5px 5px 15px grey;
	:hover {
    box-shadow: 1px 1px 3px grey;
	}
`



export const PokemonOverviewCard: FunctionComponent<CardProps> = ({ title, image, id, typeOne, typeTwo}) => {
  const history = useHistory();
  const context = useContext(Context)



  return (
    
    <Grid item xs={4} >
      <BoxHover border={1} borderRadius={5} borderColor="text.primary" onClick={() => history.push(`/${id}`)}>
        <Card onClick={() => {
          context.loadSelectedPokemon(id); context.loadPokemonEvolution(id)
        }}>
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
                style={{width: 120}}
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
                        <Box key={i} mb={1} pl={1} pr={1} border={1} borderRadius={5}  bgcolor='#fff' >
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
      </BoxHover>
      </Grid>
  )
}
 
  

