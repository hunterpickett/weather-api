import * as React from 'react';
import { SFC } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const styles = {
  paper: {
    margin: '24px 0'
  }
};

interface ICurrentConditionProps {
  info: {
    day: string;
    text: string;
    temp: string;
    locationName: string;
  };
  classes: any;
}

const CurrentConditions: SFC<ICurrentConditionProps> = props => {
  if (!props.info.locationName) return null;
  const { day, text, temp, locationName } = props.info;
  const { classes } = props;
  return (
    <div>
      <Paper className={classes.paper} elevation={4}>
        <Typography variant="headline" component="h2">
          Current Weather Conditions for {locationName}
        </Typography>
        <Typography variant="body1">{day}</Typography>
        <Typography variant="body1">{text}</Typography>
        <Typography variant="body1">{temp}</Typography>
      </Paper>
    </div>
  );
};

export default withStyles(styles)(CurrentConditions);
