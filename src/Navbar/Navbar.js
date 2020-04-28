import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Map from '../Components/ColorMap.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  card: {
    width: '200px',
    height: '200px',
    position: 'absolute',
    zIndex: 999,
    color: '#FFF',
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    top: theme.spacing(10),
    right: theme.spacing(2),
  },

  card2: {
    width: '400px',
    height: '100px',
    position: 'absolute',
    zIndex: 999,
    color: '#FFF',
    backgroundColor: 'rgba(0, 0, 0, 0.86)',
    top: theme.spacing(10),
    left: theme.spacing(2),
  },
}));



export default function ButtonAppBar() {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <AppBar position="absolute" style={{ backgroundColor: 'black' }}>
        <Toolbar>
          <img src={require('./Logo.png')} style={{ width: '50px', height: '70px' }} />
          <Typography variant="h6" className={classes.title} style={{ marginLeft: '5px' }}>
            COVID-19
          </Typography>
        </Toolbar>
      </AppBar>
    
      <div className="map">
        <Map/>
      </div>

    </div>
  );
}