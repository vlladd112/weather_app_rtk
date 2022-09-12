import { useSelector } from 'react-redux';
import { localWeatherStatus, localWeatherFromState } from '../features/weather/localWeatherSlice';

export default function LocalWeather () {

    const localWeatherDetails = useSelector(localWeatherFromState);
    const localWeatherCurrentStatus = useSelector(localWeatherStatus);

    if(localWeatherCurrentStatus === 'idle') {
    return (
        ( localWeatherDetails.main && <div className='local-weather'>
        <div className='location'>
          <div className='city'>{localWeatherDetails.name} {Math.floor(localWeatherDetails?.main?.temp)}&#176;
            <img src={`http://openweathermap.org/img/wn/${localWeatherDetails.weather[0].icon}.png`} />
          </div>
          <div className='weather-description'>{localWeatherDetails.weather[0].description}</div>
        </div>
      </div>
        )
    )}
    if(localWeatherCurrentStatus === 'loading') {
        return (
            <div className='local-weather'>LOADING...</div>
        )
    }
    if(localWeatherCurrentStatus === 'rejected') {
      return (
          <div className="searched-location-details">network erorr... make sure the location you entered is valid else contact your provider</div>
      )
  }
}