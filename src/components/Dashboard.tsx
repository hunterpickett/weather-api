import * as React from 'react';
import { Component, FormEvent } from 'react';
import { getWeather } from '../services/yahoo-weather';
import { CurrentConditions } from './CurrentConditions';

interface IDashboardProps {
  city?: string;
}

interface IDashboardState {
  date: string;
  text: string;
  temp: string;
  locationName: string;
  searchTerm: string;
}
class Dashboard extends Component<IDashboardProps, IDashboardState> {
  public constructor(props: IDashboardProps) {
    super(props);
    this.state = {
      date: '',
      locationName: '',
      searchTerm: 'chandler, az',
      temp: '',
      text: ''
    };
  }
  public componentDidMount() {
    this.search();
  }

  public search() {
    getWeather(this.state.searchTerm).then(res => {
      // tslint:disable-next-line:no-console
      console.log(res.data);
      const {
        date,
        temp,
        text
      } = res.data.query.results.channel.item.condition;
      this.setState(() => ({ date, temp, text }));
    });
  }
  public onSearchTermChanged = (e: FormEvent<HTMLInputElement>) => {
    const searchTerm = e.currentTarget.value;
    this.setState(() => ({ searchTerm }));
  };

  public onSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.search();
  };

  public render() {
    const { date, temp, text } = this.state;
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
        <h2>Current Weather Conditions for {this.state.locationName}</h2>
        <CurrentConditions info={{ date, temp, text }} />
      </div>
    );
  }
}
export default Dashboard;
