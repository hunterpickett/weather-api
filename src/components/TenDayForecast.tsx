import * as React from 'react';
interface ITenDayForecastProps {
  forecasts: any;
}

const TenDayForecast: React.SFC<ITenDayForecastProps> = props => {
  return (
    <>
      <h1>Ten Day Forecast</h1>
      <h3>{props.forecasts[0].item.condition.text}</h3>
    </>
  );
};

export default TenDayForecast;
