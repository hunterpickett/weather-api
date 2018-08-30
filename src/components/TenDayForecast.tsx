import * as React from 'react';
import SingleForecast from './SingleForecast';
import { QueryResult } from '../models/QueryResult';
interface ITenDayForecastProps {
  results: QueryResult[];
}

const TenDayForecast: React.SFC<ITenDayForecastProps> = props => {
  const query = props.results[0];
  return (
    <>
      <SingleForecast query={query} />
    </>
  );
};

export default TenDayForecast;
