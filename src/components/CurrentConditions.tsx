import * as React from 'react';
import { SFC } from 'react';

interface ICurrentConditionProps {
  info: {
    date: string;
    text: string;
    temp: string;
    locationName: string;
  };
}

export const CurrentConditions: SFC<ICurrentConditionProps> = props => {
  if (!props.info.locationName) return null;
  const { date, text, temp, locationName } = props.info;
  return (
    <div>
      <h2>Current Weather Conditions for {locationName}</h2>
      <h1>{date}</h1>
      <h1>{text}</h1>
      <h1>{temp}</h1>
    </div>
  );
};
