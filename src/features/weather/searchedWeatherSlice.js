import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getSearchedWeatherUrlAsync} from "./weatherAPI";

const initialState = {
  status: 'none',
  weatherData: {},
};

export const getSearchedWeather = createAsyncThunk(
    'weather/getSearchedWeather',
    async (params) => {
      const response = await getSearchedWeatherUrlAsync(params.location, params.language, params.unit);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const searchedWeatherSlice = createSlice({
    name: 'searchedWeather',
    initialState,
    reducers: {
  
    }, 
    extraReducers: (builder) => {
      builder
      .addCase(getSearchedWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSearchedWeather.fulfilled, (state, action) => {
        state.status = 'idle';
        state.weatherData = action.payload;
      })
      .addCase(getSearchedWeather.rejected, (state, action) => {
        state.status = 'rejected';
      })
    }
  })

  export const searchedWeatherFromState = (state) => state.searchedWeather.weatherData;
  export const searchedWeatherStatus = (state) => state.searchedWeather.status;

  export default searchedWeatherSlice.reducer;