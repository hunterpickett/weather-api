import * as React from 'react';
import getWeather from '../services/yahoo-weather';
import TenDayForecast from './TenDayForecast';
import CurrentConditions from './CurrentConditions';
import { Input, Button } from '@material-ui/core';

interface IDashboardProps {}

interface IDashboardState {
  searchQuery: string;
  data: any;
  error: string;
  isSearching: boolean;
}

const defaultState = {
  data: undefined,
  searchQuery: 'tokyo',
  error: '',
  isSearching: false
};

class Dashboard extends React.Component<IDashboardProps, IDashboardState> {
  public constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      ...defaultState
    };
  }

  public componentDidMount() {
    this.search();
  }
  public onSearchQueryChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.currentTarget.value;
    this.setState({ searchQuery });
  };

  public resetErrors() {
    this.setState({ error: '' });
  }

  public search = async () => {
    this.resetErrors();
    this.setSearchingStatus(true);
    const response: any = await this.getWeatherResponse();
    this.setSearchingStatus(false);
    if (!response.success) {
      this.handleWeatherError(response);
      return;
    }
    this.handleWeatherSuccess(response);
  };

  public setSearchingStatus(status: boolean) {
    this.setState({ isSearching: status });
  }

  public getWeatherResponse = () => {
    return Promise.race([
      getWeather(this.state.searchQuery),
      this.setTimeoutPromise(2000)
    ]).then((res: any) => {
      if (!res) return { success: false, timedOut: true };
      if (res.data.query.results === null) {
        return {
          success: false,
          noResults: true
        };
      }
      return {
        success: true,
        data: res.data
      };
    });
  };

  public setTimeoutPromise(timeout: number) {
    return new Promise(resolve => setTimeout(() => resolve(), timeout));
  }

  public handleWeatherSuccess(results: any) {
    console.log(results.data.query.results);
    this.setState({
      data: results.data.query.results
    });
  }

  public handleWeatherError(results: any) {
    this.setState({
      error: 'There was an error'
    });
  }

  public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.search();
  };

  public renderTenDayForecast() {
    if (!this.state.data) return null;
    if (this.state.error) return this.renderError();
    return <TenDayForecast results={this.state.data.channel} />;
  }

  public renderCurrentConditions() {
    if (!this.state.data) return null;
    if (this.state.error) return this.renderError();
    return (
      <>
        <CurrentConditions result={this.state.data.channel[0]} />
      </>
    );
  }

  public renderError() {
    return <h1> Shit Broke </h1>;
  }

  render() {
    return (
      <>
        <div style={{ padding: 50 }}>
          <h1> Weather Api</h1>
          <form onSubmit={this.onSubmit}>
            <Input
              placeholder="Enter a city"
              value={this.state.searchQuery}
              onChange={this.onSearchQueryChanged}
            />
            <Button onClick={this.search}>Search</Button>
          </form>
          {this.renderCurrentConditions()}
          {this.renderTenDayForecast()}
        </div>
      </>
    );
  }
}

export default Dashboard;