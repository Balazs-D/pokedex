import React, {FunctionComponent, useState} from 'react';
import { makeStyles, withStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Moves } from './Moves';
import { Infos } from './Infos';
import { Evolution } from './Evolution';

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
      flexGrow: 1,
      '&:focus': {
        opacity: 1,
      },
    },
  }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%'
  },
  demo2: {
    display: "flex",
    width: '100%',
    justifyContent: 'center'
  }
});

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
      style={{display: 'flex', justifyContent: 'space-around' }}
    >
      {value === index && (
        <Box p={3} style={{overflow: 'hidden', position: 'relative', width: '100%'}} >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



interface EvolvesToProps {
  images: any[],
  abilities: string[],
  moves: string[],
  stats: string[],
  types: string[]
 
};


export const DetailsTabs: FunctionComponent<EvolvesToProps> = (props: EvolvesToProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const { images,abilities,moves,stats,types} = props;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

console.log(images)
  return (
    <div className={classes.root}>
      <div className={classes.root}>
      <div className={classes.demo2}>
        <StyledTabs value={value} onChange={handleChange} >
          <StyledTab label="Details" />
            <StyledTab label="Moves" />
            <StyledTab label="Evolution" />
        </StyledTabs>
      
      </div>
    </div>
      
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Infos  abilities={abilities} types={types} stats={stats}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Moves items={moves}/>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Evolution
         
          images={images}
          
        /> 
        </TabPanel>
       
     
    </div>
  );
}
