import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import { SingleForecast } from './SingleForecast';

interface TenDayForecastProps {
  forecasts: Forecast[];
}

export const TenDayForecast: SFC<TenDayForecastProps> = props => {
  if (props.forecasts.length === 0) return null;
  return (
    <>
      <p>10 Day Forecast</p>
      {props.forecasts.map(f => {
        return <SingleForecast key={f.date} forecast={f} />;
      })}
    </>
  );
};
