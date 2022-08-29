import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getLocalWeather
} from '../features/weather/localWeatherSlice';
import { setLanguage } from '../features/userOptions/languageSlice';
import { setUnit } from '../features/userOptions/unitSlice';
import { useEffect } from 'react';
import styles from '../styles/navigation.css';
import LocalWeather from '../components/LocalWeather';

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
        <form id='unit' className='option-form'>
          <div className='form-title'>Unit</div>
          <div className='options-wrapper'>
            <div className='option-item'>
              <input type='radio' name='unit' id='metric' value='metric' defaultChecked onChange={(e) => {changeUnit(e)}}/><label>Metric</label>
            </div>
            <div className='option-item'>
              <input type='radio' name='unit' id='imperial' value='imperial' onChange={(e) => {changeUnit(e)}}/><label>Imperial</label>
            </div>
          </div>
        </form>
        <form id='language' className='option-form'>
          <div className="form-title">Langauge</div>
          <div className='options-wrapper'>
            <div className="option-item">
              <input type='radio' name='language' id='english' value='en' defaultChecked onChange={(e) => {changeLanguage(e)}}/><label>EN</label>
            </div>
            <div className="option-item">
              <input type='radio' name='language' id='romanian' value='ro' onChange={(e) => {changeLanguage(e)}}/><label>RO</label>
            </div>
          </div>
        </form>
      </div>  
    </nav>
  );
}
