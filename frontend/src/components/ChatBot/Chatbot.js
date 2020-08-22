


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(70),
      height: theme.spacing(70),
    },
    fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
    fontSize:'25px',
    color:'brown',
    fontWeight:'bold'
    

    
  },
}));

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
      The special offers section is meant to help in booking special events that a user doesn't want individuals who are not liscenced to attend the event should have access to.
      So if you intend to do such or request any other event please talk to our inference A.I. EVE. Eve sets an appointment with you and the EVENT TICKETING TEAM. WE LISTEN TO YOUR IDEAS
      ON HOW YOU WANT THE EVENT TO BE AVAILABLE AND THEN WE BRING IT TO LIVE
      </Paper >
      
    </div>
  );
}
