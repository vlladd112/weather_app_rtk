const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// get current geolocation
export const currentLocationCoords = () => {
    let coordinates;
    navigator.geolocation.getCurrentPosition(location => {
        coordinates = location.coords;
    })
    return coordinates;
};

export const getLocalWeatherUrl = (coords, language, unit) => `${baseUrl}?lat=${coords?.latitude}&lon=${coords?.longitude}&units=${unit}&lang=${language}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
export const getSearchedWeatherUrl = (location, language, unit) => `${baseUrl}?q=${location}&units=${unit}&lang=${language}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
