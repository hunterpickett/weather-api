import * as React from 'react';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Channel } from '../models/QueryResult';
import getIcon from '../services/code-to-icon';

const styles = {
  MuiCardContent: {
    padding: 0,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    '&:last-child': {
      paddingBottom: 0
    }
  },
  mainGrid: {
    display: 'grid',
    justifyContent: 'center'
  },
  card: {
    maxWidth: '350px',
    marginBottom: '50px'
  },
  leftContentGrid: {
    display: 'grid',
    padding: 20,
    gridTemplateColumns: '3fr 2fr',
    gridTemplateRows: '2fr 3fr 3fr',
    gridTemplateAreas: `
    ' day none'
    ' icon highTemp'
    ' icon lowTemp'
    ' area area'`
  },
  rightContentGrid: {
    display: 'grid',
    backgroundColor: '#3F51B5',
    gridTemplateRows: 'repeat(2, 1fr)',
    alignItems: 'center'
  },
  rightColumnEntry: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: 5
  },
  rightText: {
    color: 'white',
    fontSize: '20px',
    fontWeight: 600
  },
  area: {
    color: '#b6b6b6',
    gridArea: 'area'
  },
  day: {
    gridArea: 'day',
    color: '#3F51B5',
    fontWeight: 700,
    fontSize: '22px'
  },

  icon: {
    maxHeight: '90px',
    maxWidth: '90px',
    gridArea: 'icon',
    justifySelf: 'center',
    alignSelf: 'center'
  },

  highTemp: {
    gridArea: 'highTemp',
    alignSelf: 'center',
    fontSize: '26px'
  },

  lowTemp: {
    gridArea: 'lowTemp',
    alignSelf: 'center',
    fontSize: '26px'
  }
};
export interface ICurrentConditionsProps {
  result: Channel;
  classes: any;
}

interface ILeftColumnProps {
  classes: any;
  high: string;
  low: string;
  day: string;
  text: string;
  fullLocation: string;
}
// const sunny = require('../assets/weather/weather-clear.png');
const windy = require('../assets/weather/weather-wind.png');
const rainy = require('../assets/weather/weather-rain-night.png');

const LeftColumn: React.SFC<ILeftColumnProps> = props => {
  const { classes } = props;
  return (
    <div className={classes.leftContentGrid}>
      <Typography align="left" className={props.classes.day}>
        {props.day}
      </Typography>
      <img className={props.classes.icon} src={getIcon(props.text)} />
      <Typography className={props.classes.highTemp}>
        {props.high} °F
      </Typography>
      <Typography className={props.classes.lowTemp}>{props.low} °F</Typography>
      <Typography className={props.classes.area}>
        {props.fullLocation}
      </Typography>
    </div>
  );
};

interface IRightColumnProps {
  classes: any;
  windSpeed: string;
  humidity: string;
}

const RightColumn: React.SFC<IRightColumnProps> = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.rightContentGrid}>
        <RightColumnEntry
          value={`${props.humidity} %`}
          icon={rainy}
          classes={classes}
        />
        <RightColumnEntry
          value={`${props.windSpeed} km/h`}
          icon={windy}
          classes={classes}
        />
      </div>
    </>
  );
};
interface IRightColumnEntryProps {
  classes: any;
  value: string;
  icon: string;
}
const RightColumnEntry: React.SFC<IRightColumnEntryProps> = props => {
  const { classes } = props;
  return (
    <div className={classes.rightColumnEntry}>
      <img src={props.icon} style={{ height: '40px', width: '40px' }} />
      <Typography className={classes.rightText}>{props.value}</Typography>
    </div>
  );
};

const CurrentConditions = (props: ICurrentConditionsProps) => {
  const { classes } = props;
  const { day, high, low, text } = props.result.item.forecast;
  const { city, country, region } = props.result.location;
  const fullLocation = `${city}, ${region}, ${country}`;
  const { speed } = props.result.wind;
  const { humidity } = props.result.atmosphere;
  return (
    <div className={classes.mainGrid}>
      <Typography>Current Conditions</Typography>
      <Card className={classes.card}>
        <CardContent className={classes.MuiCardContent}>
          <LeftColumn
            text={text}
            day={day}
            high={high}
            low={low}
            fullLocation={fullLocation}
            classes={classes}
          />
          <RightColumn
            windSpeed={speed}
            humidity={humidity}
            classes={classes}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(CurrentConditions);
