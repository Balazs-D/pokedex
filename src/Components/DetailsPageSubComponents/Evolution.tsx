import React, {FunctionComponent} from "react";
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  BoxRow: {  
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column",
    }
  },
  PokeBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  Img: {
    width: "10vw",
    height: "10vw",
    margin: "4vw 2vw 2vw 2vw",
    [theme.breakpoints.down('xs')]: {
      width: "35vw",
      height: "35vw",
    }
  }
}));

interface EvolutionProps {
  images: string[]
}

export const Evolution: FunctionComponent<EvolutionProps> = (props: EvolutionProps) => {
  const classes = useStyles();

  const { images } = props;
  
  
  return (
   
      <>
        <div className={classes.BoxRow}> 
        {images.map((item, i) => {
          return <div className={classes.PokeBox}>
            <img className={classes.Img} alt={item[1]} key={i} src={item[0]} />
            {item[1] && <Typography key={i} align='right' variant='body1'>{item[1].toUpperCase()}</Typography>}
        </div>})}
        </div>
      
      </>
  
  )
  
}
 
  

