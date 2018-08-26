//search = () => {
//  const response = getWeatherResponse();
//  if (!response.success){
//    return handleWeatherErrors(response);
//  }
//  handleWeatherSuccess(response);
// }

import * as React from 'react';

import { Component, FormEvent } from 'react';
import { getWeather } from '../services/yahoo-weather';
import { CurrentConditions } from './CurrentConditions';
import { TenDayForecast } from './TenDayForecast';
import { Forecast } from '../models/Forecast';

interface IDashboardProps {}

interface IDashboardState {
  city: string;
  country: string;
  date: string;
  error: {
    timedOut: boolean;
    noResults: boolean;
  };
  forecasts: Forecast[];
  region: string;
  text: string;
  temp: string;
  locationName: string;
  searchTerm: string;
}

const defaultState = {
  city: '',
  country: '',
  date: '',
  error: {
    timedOut: false,
    noResults: false
  },
  forecasts: [],
  locationName: '',
  region: '',
  searchTerm: '',
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
  public componentDidMount() {}

  public setTimeoutPromise(timeout: number) {
    return new Promise(resolve => setTimeout(() => resolve(), timeout));
  }

  public dataShaper(res: any) {
    const {
      date,
      temp,
      text
    } = res.data.query.results.channel[0].item.condition;
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
      date,
      temp,
      text,
      city,
      country,
      region,
      forecasts
    };
  }

  search = async () => {
    const response = await this.getWeatherResponse();
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
      error: { timedOut: res.timedOut, noResults: res.noResults }
    });
  }

  public handleWeatherSuccess(res: any) {
    const { date, temp, text, city, country, region, forecasts } = res.results;
    this.setState({
      date,
      temp,
      text,
      city,
      country,
      region,
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

  public onSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.search();
  };

  public refresh = () => {
    this.search();
  };

  public render() {
    const { date, temp, text, locationName } = this.state;
    return (
      <div>
        <h1>Weather Api</h1>
        <form>
          <input
            onSubmit={this.onSubmit}
            value={this.state.searchTerm}
            onChange={this.onSearchTermChanged}
            placeholder="Choose a City"
          />
        </form>
        <button onClick={this.search}>Search</button>
        <button onClick={this.refresh}>Refresh</button>
        {this.renderError()}
        <CurrentConditions info={{ date, temp, text, locationName }} />
        <TenDayForecast forecasts={this.state.forecasts} />
      </div>
    );
  }
}
export default Dashboard;
