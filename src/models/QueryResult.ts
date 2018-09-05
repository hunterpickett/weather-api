export interface YahooQuery {
  query: Query;
}

export interface Query {
  count: number;
  created: string;
  lang: string;
  results: Results;
}

export interface Results {
  channel: Channel[];
}

export interface Channel {
  location: Location;
  wind: Wind;
  atmosphere: Atmosphere;
  item: Item;
}

export interface Atmosphere {
  humidity: string;
}

export interface Item {
  condition: Condition;
  forecast: Forecast;
}

export interface Condition {
  code: string;
  date: string;
  temp: string;
  text: string;
}

export interface Forecast {
  code: string;
  date: string;
  day: string;
  high: string;
  low: string;
  text: string;
}

export interface Location {
  city: string;
  country: string;
  region: string;
}

export interface Wind {
  chill: string;
  direction: string;
  speed: string;
}
