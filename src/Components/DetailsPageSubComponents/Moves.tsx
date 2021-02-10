import React, { FunctionComponent } from "react";
import {
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
interface MovesProps {
  items: any[];
};

export const Moves: FunctionComponent<MovesProps> = (props) => {
  const { items } = props;
  const classes = useStyles();

  return (
  
          <div className={classes.root}>
          {items.map((item, i) => {
            return <Chip size="small" key={i} label={item.move.name} variant="outlined" />
            
                })}  
          </div>
            
  )
}
 
  

