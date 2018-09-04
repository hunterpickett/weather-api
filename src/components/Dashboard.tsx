import * as React from 'react';
import getWeather from '../services/yahoo-weather';
import TenDayForecast from './TenDayForecast';
import CurrentConditions from './CurrentConditions';
import { Button, Fade, TextField } from '@material-ui/core';
import './Dashboard.css';

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
    if (!this.state.searchQuery) {
      this.handleWeatherError({ noSearchTerm: true });
      return;
    }
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

  public resetData() {
    this.setState({ data: undefined });
  }

  public handleWeatherError(results: any) {
    this.resetData();
    if (results.noSearchTerm) {
      this.setState({ error: 'Please enter a search term' });
      return;
    }
    if (results.timedOut) {
      this.setState({
        error:
          'The Yahoo Weather API is taking a long time to respond, please try your request again later'
      });
      return;
    }
    if (results.noResults) {
      this.setState({ error: 'Nothing was found matching that search term' });
      return;
    }
    this.setState({
      error: 'An unknown error has occured, please try again at a later time.'
    });
  }

  public onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.search();
  };

  public renderTenDayForecast() {
    if (this.state.error) return this.renderError();
    if (!this.state.data) return null;
    return <TenDayForecast results={this.state.data.channel} />;
  }

  public renderCurrentConditions() {
    if (this.state.error) return null;
    if (!this.state.data) return null;
    return (
      <>
        <CurrentConditions result={this.state.data.channel[0]} />
      </>
    );
  }

  public renderError() {
    return <h1> {this.state.error} </h1>;
  }

  public renderSpinner() {
    if (!this.state.isSearching) return null;
    return (
      <div className="atom-spinner">
        <div className="spinner-inner">
          <div className="spinner-line" />
          <div className="spinner-line" />
          <div className="spinner-line" />
          <div className="spinner-circle">&#9679;</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <div style={{ padding: 50 }}>
          <h1> Weather Api</h1>
          <form onSubmit={this.onSubmit}>
            <TextField
              label="Enter a city"
              type="search"
              value={this.state.searchQuery}
              onChange={this.onSearchQueryChanged}
            />
            <Button onClick={this.search}>Search</Button>
          </form>
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '50px'
            }}
          >
            {this.renderSpinner()}
          </div>
          <Fade in={!this.state.isSearching} timeout={{ enter: 750, exit: 50 }}>
            <div>
              {this.renderCurrentConditions()}
              {this.renderTenDayForecast()}
            </div>
          </Fade>
        </div>
      </>
    );
  }
}

export default Dashboard;
