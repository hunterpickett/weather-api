import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';

interface IForecastProps {
  forecast: Forecast;
}
export const SingleForecast: SFC<IForecastProps> = props => {
  const { text, high, low } = props.forecast;
  return (
    <>
      <h1>{text}</h1>
      <h1>
        High: {high}
        °F
      </h1>
      <h1>
        Low: {low}
        °F
      </h1>
    </>
  );
};
