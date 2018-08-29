import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';


const sunny = require('../assets/weather/weather-clear.png');
const styles = {
  MuiCard: {
    '&:last-child': {
      paddingBottom: 0
    },
    padding: 0,
    paddingBottom: 0
  },
  day: {
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'left' as 'left' //stupid
  },
  subScript: {
    fontSize: 10,
    color: 'white'
  },
  purpleSide: {
    backgroundColor: '#3f51b5',
    height: '100%'
  },
  rightColumnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 500
  },
  temp: {
    fontSize: 18
  },
  img: {
    height: 60,
    width: 60
  },
  leftColumn: {
    padding: 20,
    paddingTop: 5
  }
};

interface IForecastProps {
  forecast: Forecast;
  classes: any;
  info?: any;
}

interface LeftColumnProps {
  classes: any;
  forecast: Forecast;
}

// interface RightColumnProps {
//   classes: any;
// }

// const RightColumn: SFC<RightColumnProps> = props => (
//   <div className={props.classes.purpleSide}>
//     <Grid
//       container
//       className={props.classes.purpleSide}
//       justify="space-around"
//       direction="column"
//     >
//       <Typography className={props.classes.rightColumnText}> 0%</Typography>
//       <Typography className={props.classes.rightColumnText}> 46%</Typography>
//       <Typography className={props.classes.rightColumnText}>
//         6 <span className={props.classes.subScript}>km/h</span>
//       </Typography>
//     </Grid>
//   </div>
// );

const LeftColumn: SFC<LeftColumnProps> = props => {
  const { day, high, low } = props.forecast;
  const { classes } = props;
  return (
    <div className={classes.leftColumn}>
      <Grid item>
        <Typography className={props.classes.day}>{day}</Typography>
      </Grid>
      <Grid container alignItems="center">
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
    </div>
  );
};

const SingleForecast: SFC<IForecastProps> = props => {
  const { classes } = props;
  return (
    <Card className={classes.MuiCard}>
      <CardContent className={classes.MuiCard}>
        <LeftColumn classes={classes} forecast={props.forecast} />
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(SingleForecast);
