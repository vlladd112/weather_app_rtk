import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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

export function Nav() {
  const dispatch = useDispatch();

  const [currentLocation, setCurrentLocation] = useState(null);
  const [unitOption, setUnitOption] = useState('metric');
  const [languageOption, setLanguageOption] = useState('en');

  useEffect(() => {
    // get geolocation from browwser - if it doesn't work you
    // have to check allow location from settings soewhere
    navigator.geolocation.getCurrentPosition(location => {
      setCurrentLocation(location.coords);
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

  return (
    <nav className='navigation'>
      <LocalWeather />
      <div className='user-options'>
        <FormRadioChange eventHandler={changeUnit} type='unit' title='Unit' option1='metric' option2='imperial' />
        <FormRadioChange eventHandler={changeLanguage} type='language' title='Language' option1='en' option2='ro' />
      </div>  
    </nav>
  );
}
