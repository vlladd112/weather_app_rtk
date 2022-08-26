import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getSearchedWeather, searchedWeatherFromState } from '../features/weather/searchedWeatherSlice';
import { languageFromState } from '../features/userOptions/languageSlice';
import { unitFromState } from '../features/userOptions/unitSlice';

export function Content() {
    const dispatch = useDispatch();

    const [locationInputValue, setLocationInputValue] = useState('');
    const [searchedLocation, setSearchedLocation] = useState('');

    const searchedWeatherDetails = useSelector(searchedWeatherFromState);
    const languageDetails = useSelector(languageFromState);
    const unitDetails = useSelector(unitFromState);

    const handleLocationInput = (e) => {
        setLocationInputValue(e.target.value);
    }
    const searchLocation = (e) => {
        e.preventDefault();
        setSearchedLocation(locationInputValue);
    }

useEffect(() => {
    if(searchedLocation && languageDetails.language && unitDetails.unit) {
        const params = {
            location: searchedLocation,
            language: languageDetails.language,
            unit: unitDetails.unit
        }
        dispatch(getSearchedWeather(params))
    }
    
  }, [languageDetails, unitDetails, searchedLocation, dispatch]);

    return (
        <main>
            <div className='search-location'>
                <form>
                    <label>Search location</label>
                    <input id='search-location' type='search' value={locationInputValue} onChange={(e) => {handleLocationInput(e)}}/>
                    <button onClick={(e) => {searchLocation(e)}}>Search</button>
                </form>
            </div>
            <div className="searched-location-details">
                <div>
                    { searchedWeatherDetails.name ? searchedWeatherDetails.name : '' },&nbsp;
                    { searchedWeatherDetails.sys ? searchedWeatherDetails.sys.country : '' }&nbsp;
                    { searchedWeatherDetails.main ? Math.floor(searchedWeatherDetails.main.temp) : '' }&#176;</div>
                <div>{searchedWeatherDetails.weather ? searchedWeatherDetails.weather[0].description : '' }</div>
                <div>Feels like { searchedWeatherDetails.main ? Math.floor(searchedWeatherDetails.main.feels_like) : '' }&#176;</div>
                <div>Wind speed: { searchedWeatherDetails.wind ? Math.floor(searchedWeatherDetails.wind.speed) : '' }</div>
            </div>
        </main>
    );
}