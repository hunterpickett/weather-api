import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';

const styles = {
  card: {
    Width: 345
  },
  media: {
    height: 140
  }
};

interface IForecastProps {
  forecast: Forecast;
  className?: any;
  classes: any;
}

const SingleForecast: SFC<IForecastProps> = props => {
  const { text, high, low } = props.forecast;
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {text}
        </Typography>
        <Typography gutterBottom variant="headline" component="h2">
          High: {high} °F
        </Typography>
        <Typography gutterBottom variant="headline" component="h2">
          Low: {low} °F
        </Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(SingleForecast);
