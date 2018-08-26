import axios from 'axios';

// const testQuery2 =
//   'https://query.yahooapis.com/v1/public/yql?q=select%20item%20from weather.forecast where woeid=2378015&format=json';
// const testQuery3 =
//   "https://query.yahooapis.com/v1/public/yql?q=select wind from weather.forecast where woeid in (select woeid from geo.places(1) where text='chicago, il')";
export const getWeather = (location: string) => {
  return axios.get(queryHelper(location));
};

const queryHelper = (location: string) => {
  const queryBase =
    "https://query.yahooapis.com/v1/public/yql?q=select item.condition, location, item.forecast from weather.forecast where woeid in (select woeid from geo.places(1) where text='";
  return `${queryBase}${location}')&format=json`;
};
