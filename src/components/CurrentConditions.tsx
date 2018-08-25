import * as React from 'react';
import { SFC } from 'react';

interface ICurrentConditionProps {
  info: {
    date: string;
    text: string;
    temp: string;
  };
}

export const CurrentConditions: SFC<ICurrentConditionProps> = props => {
  const { date, text, temp } = props.info;
  return (
    <div>
      <h1>{date}</h1>
      <h1>{text}</h1>
      <h1>{temp}</h1>
    </div>
  );
};
