import * as React from 'react';
import SingleForecast from './SingleForecast';
import { QueryResult } from '../models/QueryResult';
import { withStyles } from '@material-ui/core';

const styles = {
  tenDayForecast: {
    display: 'grid',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    gridTemplateColumns: ' repeat(auto-fill, minmax(220px, 1fr))',
    gridGap: '40px',
    '@media (min-width: 1700px)': {
      gridTemplateColumns: 'repeat(5,1fr)'
    }
  }
};

interface ITenDayForecastProps {
  results: QueryResult[];
  classes: any;
}

const TenDayForecast: React.SFC<ITenDayForecastProps> = props => {
  const { classes } = props;
  return (
    <div className={classes.tenDayForecast}>
      {props.results.map(q => {
        return <SingleForecast key={q.item.forecast.date} query={q} />;
      })}
    </div>
  );
};

export default withStyles(styles)(TenDayForecast);
