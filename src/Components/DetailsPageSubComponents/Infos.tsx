import React, {FunctionComponent} from "react";
import {
  Box,
  Typography,
  LinearProgress
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  InfoBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "5vw 2vw 1vw 2vw",
    [theme.breakpoints.down('xs')]: {
      flexDirection: "column",
    }
  },
  LeftPanelBox: {
    display: "flex",
    flexDirection: "column",
    height: "10%"
  },
  BoxSpan: {
    display: "flex",
    flexDirection: "column",
    padding: "0 4vw",
    margin: "0 2vw"
  }
}));


interface InfoProps {
  abilities: any[];
  types: any[];
  stats: any[]
};


export const Infos: FunctionComponent<InfoProps> =  (props: InfoProps) => {
  const normalize = value => (value - 0) * 100 / (200 - 0);
  const classes = useStyles();

  const {abilities, types, stats} = props

  
  return (
   <Box>
    <div className={classes.InfoBox}>
      <div className={classes.LeftPanelBox}>
          <div className={classes.BoxSpan}>
            <Typography variant='h5'>Abilities</Typography>
              <Box mb={3}>
                {abilities.map((item, i) => {
                  return <Typography key={i} variant='body1'>{item.ability.name}</Typography>
                })}
              </Box>
          </div>
          
          
          <div className={classes.BoxSpan}>
            <Box mb={3} >
                <Typography variant='h5'>Types</Typography>
                {types.map((item, i) => {
                  return <Typography key={i} variant='body1'>{item.type.name}</Typography>
                })}
          </Box></div>
      </div>  
          
          <div className={classes.BoxSpan}> 
              <Typography variant='h5'>Stats</Typography>
                {stats.map((item, i) => {
                  return (
                    <Box mb={1} key={i}>
                      <Typography  variant='body1'>{item.stat.name}: {item.base_stat}</Typography>
                      <LinearProgress variant="determinate" value={normalize(item.base_stat)} />
                    </Box>)
                })}
              
             </div>     
      </div>
    
    
    </Box>
  )
  
}
 
  

