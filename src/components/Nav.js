import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLocalWeather
} from '../features/weather/localWeatherSlice';
import { setLanguage } from '../features/userOptions/languageSlice';
import { setUnit } from '../features/userOptions/unitSlice';
import { useEffect } from 'react';
// eslint-disable-next-line
import styles from '../styles/navigation.css';
import LocalWeather from '../components/LocalWeather';
import { FormRadioChange } from './FormRadioChange';
import { logout } from '../features/authentication/firebaseService';
import { auth } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import {setLoginStatus, loginStatusFromState} from '../features/authentication/loginSlice';
import UserInfo from './UserInfo';




export function Nav() {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [unitOption, setUnitOption] = useState('metric');
  const [languageOption, setLanguageOption] = useState('en');

  const [user, setUser] = useState({});
  const authenticationStatus = useSelector(loginStatusFromState);
  

  useEffect(() => {
    // get geolocation from browwser - if it doesn't work you
    // have to check allow location from settings soewhere
    navigator.geolocation.getCurrentPosition(location => {
      setCurrentLocation(location.coords);
    })

    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    })

  }, []);

   useEffect(() => {
    if(currentLocation) {
      // only when you have the location available you can
      // dispatch() to make the API call for the weather
    const params = {
      geolocation: currentLocation,
      language: languageOption,
      unit: unitOption
    }
      dispatch(getLocalWeather(params));
    }
  }, [currentLocation, languageOption, unitOption, dispatch]);

  

  const changeUnit = (e) => {
    setUnitOption(e.target.value);
    dispatch(setUnit(e.target.value));
  }

  const changeLanguage = (e) => {
    setLanguageOption(e.target.value);
    dispatch(setLanguage(e.target.value));
  }

  const logoutUser = async (e) => {
    dispatch(setLoginStatus('none'));
    logout(auth);
  }

  return (
    <nav className='navigation'>
      <div className='user-info'>
        <UserInfo user={user} authenticationStatus={authenticationStatus} action={logoutUser} />
      </div>
      <LocalWeather />
      <div className='user-options'>
        <FormRadioChange eventHandler={changeUnit} type='unit' title='Unit' option1='metric' option2='imperial' />
        <FormRadioChange eventHandler={changeLanguage} type='language' title='Language' option1='en' option2='ro' />
      </div>
    </nav>
  );
}
