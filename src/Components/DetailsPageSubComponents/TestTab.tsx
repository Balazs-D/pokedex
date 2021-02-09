import React, {useContext, useState} from 'react';
import { makeStyles, withStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import {Context} from '../../Context/Context';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {pokemonStyleColor} from '../../Components/HelperFunctions/StyleFunctions'

import { Moves } from './Moves';
import { Infos } from './Infos';

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: "#2E3B55",
    },
  },
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      color: 'black',
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      marginRight: theme.spacing(1),
      // backgroundColor: "transparent",
      rootTab: {
      flexGrow: 1,
      
  },
      flexGrow: 1,
      '&:focus': {
        opacity: 1,
      },
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  padding: {
    // padding: theme.spacing(3),
  },
  demo2: {
    display: "flex",
    width: '100%',
    justifyContent: 'center'
  },
}));

// ----------------

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
      style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



export default function NavTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const context = useContext(Context)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <div className={classes.root}>
      <div className={classes.demo2}>
        <StyledTabs value={value} onChange={handleChange} >
          <StyledTab label="Details" />
          <StyledTab label="Moves" />
        </StyledTabs>
        <Typography className={classes.padding} />
      </div>
    </div>
      
     
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Infos evolutionImages={props.evolutionImages} evolution={props.evolution} selectedPokemon={context.soloPokemon[0]}/>

        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Moves items={context.soloPokemon[0]}/>
        </TabPanel>
       
     
    </div>
  );
}
