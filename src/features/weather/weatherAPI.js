import axios from "axios";
import {getLocalWeatherUrl, getSearchedWeatherUrl} from "../../api";

export async function getLocalWeatherUrlAsync(coords, language, unit) {
  try {
    const response = await axios.get(getLocalWeatherUrl(coords, language, unit));
    console.log("weatherAPI response", response.data);
    return response;
  } catch (err) {
    console.log('ERROR FETCHING LOCAL WEATHER', err);
  }
}

export async function getSearchedWeatherUrlAsync(coords, language, unit) {
  try {
    const response = await axios.get(getSearchedWeatherUrl(coords, language, unit));
    console.log("counterAPI response", response.data);
    return response;
  } catch (err) {
    console.log('ERROR FETCHING SEARCHED WEATHER', err);
  }
}
