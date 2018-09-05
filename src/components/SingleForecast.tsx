import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import './SingleForecast.css';
import { Channel } from '../models/QueryResult';
import getIcon from '../services/code-to-icon';

const styles = {
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gridTemplateRows: '2fr 3fr 3fr',
    gridTemplateAreas: `
    ' day none'
    ' icon highTemp'
    ' icon lowTemp'`
  },

  day: {
    gridArea: 'day',
    color: '#3F51B5',
    fontWeight: 700,
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

// const sunny = require('../assets/weather/weather-clear.png');

export interface ISingleForecastProps {
  query: Channel;
  classes: any;
}

const SingleForecast: React.SFC<ISingleForecastProps> = props => {
  const { day, high, low, text } = props.query.item.forecast;
  const { classes } = props;
  return (
    <Card>
      <CardContent className="content-grid">
        <Typography align="left" className={classes.day}>
          {day}
        </Typography>
        <img className={classes.icon} src={getIcon(text)} />
        <Typography className={classes.highTemp}>{high} °F</Typography>
        <Typography className={classes.lowTemp}>{low} °F</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(SingleForecast);
