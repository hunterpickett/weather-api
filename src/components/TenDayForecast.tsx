import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import { SingleForecast } from './SingleForecast';

interface TenDayForecastProps {
  forecasts: Forecast[];
}

export const TenDayForecast: SFC<TenDayForecastProps> = props => {
  return (
    <div>
      {props.forecasts !== [] && (
        <div>
          <p>10 Day Forecast</p>
          {props.forecasts !== [] &&
            props.forecasts.map(f => {
              return <SingleForecast key={f.date} forecast={f} />;
            })}
        </div>
      )}
    </div>
  );
};
