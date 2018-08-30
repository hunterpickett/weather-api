export interface QueryResult {
  item: {
    condition: {
      code: string;
      date: string;
      temp: string;
      text: string;
    };
    forecast: {
      code: string;
      date: string;
      day: string;
      high: string;
      low: string;
      text: string;
    };
  };
  location: {
    city: string;
    country: string;
    region: string;
  };
  wind: {
    chill: string;
    direction: string;
    speed: string;
  };
}
