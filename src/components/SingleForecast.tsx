import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
const sunny = require('../assets/weather/weather-clear.png');
const styles = {
  MuiCard: {
    width: 260,
    padding: 0,
    paddingBottom: 0
  },
  day: {
    color: '#3f51b5',
    fontSize: 18
  },
  purpleSide: {
    backgroundColor: '#3f51b5',
    height: '100%',
  },
  whiteText: {
    color: 'white'
  },
  temp: {
    fontSize: 26
  },
  img: {
    height: 90,
    width: 90
  }
};

interface IForecastProps {
  forecast: Forecast;
  className?: any;
  classes: any;
}

interface LeftColumnProps {
  classes: any;
  forecast: Forecast;
}

interface RightColumnProps {
  classes: any;
}

const RightColumn: SFC<RightColumnProps> = props => (
  <div className={props.classes.purpleSide}>
    <Grid container className={props.classes.purpleSide} justify="space-around" direction="column">
      <Typography className={props.classes.whiteText}> 0%</Typography>
      <Typography className={props.classes.whiteText}> 46%</Typography>
      <Typography className={props.classes.whiteText}> km/h</Typography>
    </Grid>
  </div>
);

const LeftColumn: SFC<LeftColumnProps> = props => {
  const { high, low } = props.forecast;
  return (
    <>
    <Grid item >
      <Typography className={props.classes.day} >
        {/* {date} */}
        Monday
      </Typography>
    </Grid>
    <Grid container alignItems="center" >
      <Grid item lg={6}>
        <img className={props.classes.img} src={sunny} />
      </Grid>
      <Grid item lg={6}>
        <Typography className={props.classes.temp}>
          {high} °F
        <br />
          {low} °F
      </Typography>
      </Grid>
    </Grid>
    </>
  );
};

const SingleForecast: SFC<IForecastProps> = props => {
  const { classes } = props;
  return (
    <Card className={classes.MuiCard}>
      <CardContent className={classes.MuiCard}>
        <Grid container>
          <Grid item lg={8}>
            <LeftColumn classes={classes} forecast={props.forecast} />
          </Grid>
          <Grid item lg={4}>
            <RightColumn classes={classes} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(SingleForecast);
