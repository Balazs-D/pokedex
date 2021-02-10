import React, {FunctionComponent} from "react";
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  BoxRow: {  
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  Img: {
    width: "10vw",
    height: "10vw",
    margin: "4vw 2vw 2vw 2vw"
  }
});

interface EvolutionProps {
  names: any[],
  images: any[]
}

export const Evolution: FunctionComponent<EvolutionProps> = (props: EvolutionProps) => {
  const classes = useStyles();

  const { names, images } = props;
  
  return (
   
      <>
        <div className={classes.BoxRow}> 
        {images.map((item, i) => { return <img className={classes.Img} alt={names[i]} key={i} src={item} />})}
        </div>
      <div className={classes.BoxRow}  >
       {names.map((item,i)=>{return <Typography key={i} align='right' variant='body1'>{item.toUpperCase()}</Typography>})}   
        </div>
                
      </>
  
  )
  
}
 
  

