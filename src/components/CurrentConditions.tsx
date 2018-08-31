import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { QueryResult } from '../models/QueryResult';

const styles = {
  cardGrid: {
    display: 'grid',
    gridTemplateColumn: '2fr 1fr'
  },
  leftContentGrid: {
    // display: 'grid',
    // gridTemplateColumns: '3fr 2fr',
    // gridTemplateRows: '2fr 3fr 3fr',
    // gridTemplateAreas: `
    // ' day none'
    // ' icon highTemp'
    // ' icon lowTemp'`
  },
  rightContentGrid: {},

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
  return (
    <>
      <Typography align="left" className={props.classes.day}>
        {props.day}
      </Typography>
      <img className={props.classes.icon} src={sunny} />
      <Typography className={props.classes.highTemp}>
        {props.high} °F
      </Typography>
      <Typography className={props.classes.lowTemp}>{props.low} °F</Typography>
    </>
  );
};

interface IRightColumnProps {}

const RightColumn: React.SFC<IRightColumnProps> = props => {
  return (
    <>
      <h1>Hello I'm the Right Column</h1>
    </>
  );
};

const CurrentConditions = (props: ICurrentConditionsProps) => {
  const { classes } = props;
  const { day, high, low } = props.result.item.forecast;
  // const { windSpeed } = props.result.wind.speed;
  return (
    <div>
      <Card>
        <CardContent className={classes.cardGrid}>
          <div className={classes.leftContentGrid}>
            <LeftColumn day={day} high={high} low={low} classes={classes} />
          </div>
          <div className={classes.rightContentGrid}>
            <RightColumn />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(CurrentConditions);
