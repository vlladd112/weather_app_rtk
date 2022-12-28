import { useSelector } from 'react-redux';
import { searchedWeatherStatus, searchedWeatherFromState } from '../features/weather/searchedWeatherSlice';

export function SearchedWeather () {
    
    const searchedWeatherDetails = useSelector(searchedWeatherFromState);
    const searchedWeatherCurrentStatus = useSelector(searchedWeatherStatus);

    if(searchedWeatherCurrentStatus === 'idle') {
        return (
            (searchedWeatherDetails && <div className="searched-location-details">
                <div>
                    { searchedWeatherDetails.name ? searchedWeatherDetails.name : '' },&nbsp;
                    { searchedWeatherDetails.sys ? searchedWeatherDetails.sys.country : '' }&nbsp;
                    { searchedWeatherDetails.main ? Math.floor(searchedWeatherDetails.main.temp) : '' }&#176;</div>
                <div>Feels like { searchedWeatherDetails.main ? Math.floor(searchedWeatherDetails.main.feels_like) : '' }&#176;</div>
                <img src={ searchedWeatherDetails.weather ? `http://openweathermap.org/img/wn/${searchedWeatherDetails.weather[0].icon}.png` : ''} alt='' />
                <div>{searchedWeatherDetails.weather ? searchedWeatherDetails.weather[0].description : '' }</div>
                
                <div>Wind speed: { searchedWeatherDetails.wind ? Math.floor(searchedWeatherDetails.wind.speed) : '' }</div>
            </div>
            )
        )
    }
    if(searchedWeatherCurrentStatus === 'loading') {
        return (
            <div className="searched-location-details">LOADING...</div>
        )
    }
    if(searchedWeatherCurrentStatus === 'rejected') {
        return (
            <div className="searched-location-details">network erorr... make sure the location you entered is valid else contact your provider</div>
        )
    }
    
}