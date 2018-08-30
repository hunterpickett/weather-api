import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import './SingleForecast.css';
import { QueryResult } from '../models/QueryResult';

const styles = {
  card: {
    maxWidth: '220px',
    maxHeight: '150px'
  },

  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gridTemplateRows: '1fr 2fr 2fr',
    gridTemplateAreas: `
    ' day none'
    ' icon highTemp'
    ' icon lowTemp'`
  },

  day: {
    gridArea: 'day',
    alignSelf: 'left',
    justifySelf: 'left',
    color: '#3F51B5',
    fontWeight: 500,
    fontSize: '16px'
  },

  icon: {
    maxHeight: '80px',
    maxWidth: '80px',
    gridArea: 'icon',
    justifySelf: 'center'
  },

  highTemp: {
    gridArea: 'highTemp'
  },

  lowTemp: {
    gridArea: 'lowTemp'
  }
};

const sunny = require('../assets/weather/weather-clear.png');

export interface ISingleForecastProps {
  query: QueryResult;
  classes: any;
}

const SingleForecast: React.SFC<ISingleForecastProps> = props => {
  const { day, high, low } = props.query.item.forecast;
  const { classes } = props;
  return (
    <div className="card">
      <Card>
        <CardContent className="content-grid">
          <Typography className={classes.day}>{day}</Typography>
          <img className={classes.logo} src={sunny} />
          <Typography className={classes.highTemp}>{high}</Typography>
          <Typography className={classes.lowTemp}>{low}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(SingleForecast);
