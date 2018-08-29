import * as React from 'react';
import { Component, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import { getWeather } from '../services/yahoo-weather';
import CurrentConditions from './CurrentConditions';
import TenDayForecast from './TenDayForecast';
import { Forecast } from '../models/Forecast';
import { Input, CircularProgress, Grid, withStyles } from '@material-ui/core';

const styles = {
  spinner: {
    marginTop: 150
  }
};

interface IDashboardProps {
  classes: any;
}

interface IDashboardState {
  day: string;
  error: {
    timedOut: boolean;
    noResults: boolean;
  };
  forecasts: Forecast[];
  text: string;
  temp: string;
  locationName: string;
  isSearching: boolean;
  searchTerm: string;
}

const defaultState = {
  day: '',
  error: {
    timedOut: false,
    noResults: false
  },
  forecasts: [],
  isSearching: false,
  locationName: '',
  searchTerm: 'tokyo',
  temp: '',
  text: ''
};

class Dashboard extends Component<IDashboardProps, IDashboardState> {
  public constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      ...defaultState
    };
  }
  public componentDidMount() {
    this.search();
  }

  public setTimeoutPromise(timeout: number) {
    return new Promise(resolve => setTimeout(() => resolve(), timeout));
  }

  public dataShaper(res: any) {
    console.log(res);
    const { temp, text } = res.data.query.results.channel[0].item.condition;
    const { day } = res.data.query.results.channel[0].item.forecast.day;
    console.log(day);
    const {
      city,
      country,
      region
    } = res.data.query.results.channel[0].location;
    let forecasts: Forecast[] = [];
    res.data.query.results.channel.forEach((c: any) => {
      forecasts.push(c.item.forecast);
    });
    return {
      day,
      temp,
      text,
      locationName: `${city}, ${region}, ${country}`,
      forecasts
    };
  }

  public setSearchingStatus(status: boolean) {
    this.setState({ isSearching: status });
  }

  public resetErrors() {
    this.setState({ error: { timedOut: false, noResults: false } });
  }

  public search = async () => {
    this.resetErrors();
    this.setSearchingStatus(true);
    const response = await this.getWeatherResponse();
    this.setSearchingStatus(false);
    if (!response.success) {
      this.handleWeatherError(response);
      return;
    }
    this.handleWeatherSuccess(response);
  };

  public getWeatherResponse = () => {
    return Promise.race([
      getWeather(this.state.searchTerm),
      this.setTimeoutPromise(2000)
    ]).then((res: any) => {
      if (!res) {
        return { success: false, timedOut: true };
      }
      if (res.data.query.results === null) {
        return {
          success: false,
          noResults: true
        };
      }
      const data = this.dataShaper(res);
      return {
        success: true,
        results: data
      };
    });
  };

  public handleWeatherError(res: any) {
    this.setState({
      ...defaultState,
      error: { timedOut: res.timedOut, noResults: res.noResults }
    });
  }

  public handleWeatherSuccess(res: any) {
    const { day, temp, text, forecasts, locationName } = res.results;
    this.setState({
      day,
      locationName,
      temp,
      text,
      forecasts
    });
  }

  public renderError() {
    if (!this.state.error.timedOut && !this.state.error.noResults) return null;
    if (this.state.error.timedOut) return <p>Timed out homie</p>;
    return <p>No results homie</p>;
  }

  public onSearchTermChanged = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchTerm = e.currentTarget.value;
    this.setState(() => ({ searchTerm }));
  };

  public onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.search();
  };

  public renderWeatherInfo({ day, temp, text, locationName }: IDashboardState) {
    if (this.state.isSearching)
      return (
        <Grid container className={this.props.classes.spinner} justify="center">
          <CircularProgress size={100} />
        </Grid>
      );
    return (
      <>
      <CurrentConditions info={{ day, temp, text, locationName }} />
      <TenDayForecast
        isSearching={this.state.isSearching}
        forecasts={this.state.forecasts}
      />
      </>
    );
  }

  public render() {
    return (
      <div>
        <h1>Weather Api</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            value={this.state.searchTerm}
            onChange={this.onSearchTermChanged as any}
            placeholder="Choose a City"
          />
        </form>
        <Button variant="outlined" color="primary" onClick={this.search}>
          Search
        </Button>
        <Button variant="outlined" color="primary" onClick={this.search}>
          Refresh
        </Button>
        {this.renderError()}
        {this.renderWeatherInfo(this.state)}
      </div>
    );
  }
}
export default withStyles(styles)(Dashboard);
