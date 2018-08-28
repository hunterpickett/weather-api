import * as React from 'react';
import { SFC } from 'react';
import { Forecast } from '../models/Forecast';
import { Card, CardContent, Typography, withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import WBSunny from '@material-ui/icons/WBSunny';

const styles = {
  card: {
    Width: 363,
    Height: 200,
    padding: 0,
    paddingBottom: 0
  },
  purpleSide: {
    backgroundColor: '#3f51b5',
    Height: 200,
    Width: 121
  }
};

interface IForecastProps {
  forecast: Forecast;
  className?: any;
  classes: any;
}

interface LeftColumnProps {
  classes: any;
  forecast: Forecast;
}

interface RightColumnProps {
  classes: any;
}

const RightColumn: SFC<RightColumnProps> = props => (
  <div className={props.classes.purpleSide}>
    <Grid container direction="column">
      <Typography> 0%</Typography>
      <Typography> 46%</Typography>
      <Typography> km/h</Typography>
    </Grid>
  </div>
);

const LeftColumn: SFC<LeftColumnProps> = props => {
  const { high, low } = props.forecast;
  return (
    <>
      <Typography gutterBottom variant="headline" component="h1">
        {/* {date} */}
        Monday
      </Typography>
      <Typography gutterBottom variant="headline" component="h2">
        <WBSunny />
        {high} °F
        <br />
        {low} °F
      </Typography>
      <Typography gutterBottom variant="headline" component="h2">
        {high} °F
        <br />
        {low} °F
      </Typography>
    </>
  );
};

const SingleForecast: SFC<IForecastProps> = props => {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent className={classes.card}>
        <Grid container>
          <Grid item lg={8}>
            <LeftColumn classes={classes} forecast={props.forecast} />
          </Grid>
          <Grid item lg={4}>
            <RightColumn classes={classes} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(SingleForecast);
