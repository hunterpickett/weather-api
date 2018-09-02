import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { QueryResult } from '../models/QueryResult';

const styles = {
  MuiCardContent: {
    padding: 0,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    '&:last-child': {
      paddingBottom: 0
    }
  },
  mainGrid: {
    display: 'grid',
    justifyContent: 'center'
  },
  card: {
    maxWidth: '300px',
    marginBottom: '50px'
  },
  leftContentGrid: {
    display: 'grid',
    padding: 20,
    gridTemplateColumns: '3fr 2fr',
    gridTemplateRows: '2fr 3fr 3fr',
    gridTemplateAreas: `
    ' day none'
    ' icon highTemp'
    ' icon lowTemp'`
  },
  rightContentGrid: {
    display: 'grid',
    backgroundColor: '#3F51B5',
    gridTemplateRows: 'repeat(3, 1fr)',
    alignItems: 'center'
  },
  rightText: {
    color: 'white'
  },
  day: {
    gridArea: 'day',
    color: '#3F51B5',
    fontWeight: 500,
    fontSize: '22px'
  },

  icon: {
    maxHeight: '90px',
    maxWidth: '90px',
    gridArea: 'icon',
    justifySelf: 'center',
    alignSelf: 'center'
  },

  highTemp: {
    gridArea: 'highTemp',
    alignSelf: 'center',
    fontSize: '26px'
  },

  lowTemp: {
    gridArea: 'lowTemp',
    alignSelf: 'center',
    fontSize: '26px'
  }
};
export interface ICurrentConditionsProps {
  result: QueryResult;
  classes: any;
}

interface ILeftColumnProps {
  classes: any;
  high: string;
  low: string;
  day: string;
}
const sunny = require('../assets/weather/weather-clear.png');

const LeftColumn: React.SFC<ILeftColumnProps> = props => {
  const { classes } = props;
  return (
    <div className={classes.leftContentGrid}>
      <Typography align="left" className={props.classes.day}>
        {props.day}
      </Typography>
      <img className={props.classes.icon} src={sunny} />
      <Typography className={props.classes.highTemp}>
        {props.high} °F
      </Typography>
      <Typography className={props.classes.lowTemp}>{props.low} °F</Typography>
    </div>
  );
};

interface IRightColumnProps {
  classes: any;
}

const RightColumn: React.SFC<IRightColumnProps> = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.rightContentGrid}>
        <Typography className={classes.rightText}>50%</Typography>
        <Typography className={classes.rightText}>50%</Typography>
        <Typography className={classes.rightText}>50%</Typography>
      </div>
    </>
  );
};

const CurrentConditions = (props: ICurrentConditionsProps) => {
  const { classes } = props;
  const { day, high, low } = props.result.item.forecast;
  // const { windSpeed } = props.result.wind.speed;
  return (
    <div className={classes.mainGrid}>
      <h1>Current Conditions</h1>
      <Card className={classes.card}>
        <CardContent className={classes.MuiCardContent}>
          <LeftColumn day={day} high={high} low={low} classes={classes} />
          <RightColumn classes={classes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(CurrentConditions);
