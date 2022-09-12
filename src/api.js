const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

export const getLocalWeatherUrl = (coords, language, unit) => `${baseUrl}?lat=${coords?.latitude}&lon=${coords?.longitude}&units=${unit}&lang=${language}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
export const getSearchedWeatherUrl = (location, language, unit) => `${baseUrl}?q=${location}&units=${unit}&lang=${language}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
