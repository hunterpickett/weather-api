import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import SingleForecast from './SingleForecast';
import { withStyles, Typography } from '@material-ui/core';
import './TenDayForecast.css';

const styles = {
  container: {
    padding: '10px'
  },
  item: {
    height: '100px',
    color: 'white',
    backgroundColor: 'black'
  }
};

interface TenDayForecastProps {
  forecasts: Forecast[];
  classes?: any;
  isSearching: boolean;
}

const TenDayForecast: SFC<TenDayForecastProps> = props => {
  if (props.forecasts.length === 0) return null;
  return (
    <>
    <Typography color="secondary" variant="title">
      10 Day Forecast
      </Typography>
    <div className="grid-container">
      {props.forecasts.map(f => {
        return (
          <SingleForecast forecast={f} />
        );
      })}
    </div>
    </>
  );
};

export default withStyles(styles)(TenDayForecast);
