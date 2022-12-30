import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getSearchedWeather } from '../features/weather/searchedWeatherSlice';
import { languageFromState } from '../features/userOptions/languageSlice';
import { unitFromState } from '../features/userOptions/unitSlice';
import { SearchedWeather } from '../components/SearchedWeather';
// import { currentUserFromState } from '../features/authentication/loginSlice';    // state version
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { loginStatusFromState } from "../features/authentication/loginSlice";

export function Content() {
    const dispatch = useDispatch();

    const [locationInputValue, setLocationInputValue] = useState('');
    const [searchedLocation, setSearchedLocation] = useState('');

    const languageDetails = useSelector(languageFromState);
    const unitDetails = useSelector(unitFromState);
    // const userFromState = useSelector(currentUserFromState);     // state version

    const [user, setUser] = useState({});   // auth version
    const authenticationStatus = useSelector(loginStatusFromState);

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

  useEffect(() => {
    console.log('AAAUUUTTTHHHXXX:', auth);
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser?.email);
    })
  }, []);

    return (
        <main>
            <div className='search-location'>
                <form>
                    <label>Search location</label>
                    <input id='search-location' type='search' disabled={!user} value={user ? locationInputValue : ''} onChange={(e) => {handleLocationInput(e)}}/>
                    <button disabled={!user} onClick={(e) => {searchForLocation(e)}}>Search</button>
                </form>
                <p className={!user ? 'show' : 'hidden'}>You must login to use Search</p>
            </div>
            <SearchedWeather user={user} authenticationStatus={authenticationStatus} />
        </main>
    );
}