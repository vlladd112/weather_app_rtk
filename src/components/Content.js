import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getSearchedWeather } from '../features/weather/searchedWeatherSlice';
import { languageFromState } from '../features/userOptions/languageSlice';
import { unitFromState } from '../features/userOptions/unitSlice';
import { SearchedWeather } from '../components/SearchedWeather';

export function Content() {
    const dispatch = useDispatch();

    const [locationInputValue, setLocationInputValue] = useState('');
    const [searchedLocation, setSearchedLocation] = useState('');

    const languageDetails = useSelector(languageFromState);
    const unitDetails = useSelector(unitFromState);

    const handleLocationInput = (e) => {
        setLocationInputValue(e.target.value);
    }
    const searchForLocation = (e) => {
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
                    <button onClick={(e) => {searchForLocation(e)}}>Search</button>
                </form>
            </div>
            <SearchedWeather />
        </main>
    );
}