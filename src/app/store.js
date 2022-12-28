import { configureStore } from '@reduxjs/toolkit';
import localWeatherReducer from '../features/weather/localWeatherSlice';
import searchedWeatherReducer from '../features/weather/searchedWeatherSlice';
import getLanguage from '../features/userOptions/languageSlice';
import getUnit from '../features/userOptions/unitSlice';
import loginUserReducer from '../features/authentication/loginSlice';

export const store = configureStore({
  reducer: {
    localWeather: localWeatherReducer,
    searchedWeather: searchedWeatherReducer,
    language: getLanguage,
    unit: getUnit,
    userAuthentication: loginUserReducer
  },
});
