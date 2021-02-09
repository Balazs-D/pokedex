import React, { FunctionComponent, ReactNode } from "react";
import { map } from 'rxjs/operators';

import styled from 'styled-components';
import {
  Box,
  Typography,
  Chip,
} from "@material-ui/core";
import { makeStyles,  } from '@material-ui/core/styles';


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

const InfoBox = styled(Box)`
width: 20%;
display: flex;
flex-direction: column;
margin: 2vw;
`
const MovesBox = styled(InfoBox)`
width: 100%;
margin-left: 0;
display: flex;
`





// Declare incomming array structure 
// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }


export const Moves=(props)=>{
//  export const Moves = <T extends unknown>(props: MovesProps<T>) => {
  const classes = useStyles();
// console.log(renderItem)
// const { items, renderItem } = props;

console.log(props.items)
  return (
    
            <MovesBox >
          <Typography variant='h5'>Moves</Typography>
          <div className={classes.root}>
           {/* <MovesKeeper>  */}
          {props.items.moves.map((item, i) => {
            return <Chip key={i} label={item.move.name} variant="outlined" />
            // <Grid item xs> <Typography variant='body1'>{item.move.name}</Typography></Grid>
                })}
              {/* </MovesKeeper>  */}
          </div>
         
              
            </MovesBox>
      
     
       
    
       
  )
}
 
  

