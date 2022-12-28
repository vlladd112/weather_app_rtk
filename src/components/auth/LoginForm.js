import { useSelector } from 'react-redux';
// import { localWeatherStatus, localWeatherFromState } from '../features/weather/localWeatherSlice';

export function LoginForm ({ formName, placeholder1, placeholder2, setLoginEmailxxx, setLoginPasswordxxx, handleEvent }) {

    // if(localWeatherCurrentStatus === 'idle') {
    return (
        <div key={formName}>
          <h3>{formName}</h3>
          <input placeholder={placeholder1} onChange={(e) => {setLoginEmailxxx(e.target.value)}}/>
          <br></br>
          <input placeholder={placeholder2} onChange={(e) => {setLoginPasswordxxx(e.target.value)}}/><br />
          <button onClick={handleEvent}>Login</button>
          {/* <ActionButton /> */}
          <br />
          <br />
        </div>
    )}
    // if(localWeatherCurrentStatus === 'loading') {
    //     return (
    //         <div className='local-weather'>LOADING...</div>
    //     )
    // }
    // if(localWeatherCurrentStatus === 'rejected') {
    //   return (
    //       <div className="searched-location-details">network erorr... make sure the location you entered is valid else contact your provider</div>
    //   )
//   }
// }