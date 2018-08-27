import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import SingleForecast from './SingleForecast';
import { withStyles, Grid, Typography, Fade } from '@material-ui/core';

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
  const { classes } = props;
  return (
    <>
      <Typography color="secondary" variant="title">
        10 Day Forecast
      </Typography>
      <Grid container spacing={16} justify="center">
        {props.forecasts.map(f => {
          return (
            <Fade
              timeout={{ enter: 750, exit: 75 }}
              key={f.date}
              in={!props.isSearching}
            >
              <Grid item lg={3}>
                <SingleForecast className={classes.item} forecast={f} />
              </Grid>
            </Fade>
          );
        })}
      </Grid>
    </>
  );
};

export default withStyles(styles)(TenDayForecast);
