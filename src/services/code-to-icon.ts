// const snow = require('../assets/weather/weather-big-snow.png');
const cloudy = require('../assets/weather/weather-clouds.png');
const wind = require('../assets/weather/weather-wind.png');
const sunny = require('../assets/weather/weather-clear.png');
const storm = require('../assets/weather/weather-storm-day.png');
const scatteredShowers = require('../assets/weather/weather-showers-scattered-day.png');

const getIcon = (weather: string) => {
  switch (weather) {
    case 'Thunderstorms':
      return storm;
    case 'Scattered Thunderstorms':
      return storm;
    case 'Breezy':
      return wind;
    case 'Windy':
      return wind;
    case 'Mostly Sunny':
      return sunny;
    case 'Cloudy':
      return cloudy;
    case 'Mostly Cloudy':
      return cloudy;
    case 'Partly Cloudy':
      return cloudy;
    case 'Scattered Showers':
      return scatteredShowers;
    default:
      return sunny;
  }
};

export default getIcon;
