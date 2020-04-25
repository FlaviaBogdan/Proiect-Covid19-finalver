import  React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
  

function Legend() {
    const classes = useStyles();
    return (
        <Card className={classes.card} style={{ textAlign: 'center' }}>
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          Legenda
        </Typography>
        <Grid style={{ marginLeft: '10px', marginTop: '10px' }}
          container
          direction="column"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Grid item >
            <div style={{ flexDirection: "row", display: 'inline-flex' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#980230' }} />
              <Typography variant="subtitle1" style={{ color: 'white', marginLeft: '10px' }}>
              &gt; 10000 
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div style={{ flexDirection: "row", display: 'inline-flex' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#AF0238' }} />
              <Typography variant="subtitle1" style={{ color: 'white', marginLeft: '10px' }}>
              &gt; 5000 &amp; &lt; 10000 
              </Typography>
            </div>
          </Grid>

          <Grid item>
            <div style={{ flexDirection: "row", display: 'inline-flex' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#D50747' }} />
              <Typography variant="subtitle1" style={{ color: 'white', marginLeft: '10px' }}>
              &gt; 1000 &amp; &lt; 5000 
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div style={{ flexDirection: "row", display: 'inline-flex' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: '#F17481' }} />
              <Typography variant="subtitle1" style={{ color: 'white', marginLeft: '10px' }}>
              &lt; 1000
              </Typography>
            </div>
         </Grid>
        </Grid>
      </Card>
    )
};

export default Legend;