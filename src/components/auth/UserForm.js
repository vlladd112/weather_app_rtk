// import { useSelector } from 'react-redux';
// import { localWeatherStatus, localWeatherFromState } from '../features/weather/localWeatherSlice';

export function UserForm ({ formProps }) {
  return (
      <div key={formProps.formName}>
        <h3>{formProps.formName}</h3>
        <input placeholder={formProps.placeholder1} onChange={(e) => {formProps.setOption1(e.target.value)}}/>
        <br></br>
        <input placeholder={formProps.placeholder2} onChange={(e) => {formProps.setOption2(e.target.value)}}/><br />
        <button onClick={formProps.handleEvent}>{formProps.formName}</button>
        {/* TODO: add ActionButton component in stead of button above */}
        {/* <ActionButton /> */}
        <br></br>
        {formProps.formLink ?
          <div>{
            formProps.showRegisterForm ?
              <p>You don't have an account?</p> : undefined
            }
            <p>You don't have an account?</p><button onClick={formProps.formLinkAction}>Register</button></div> : undefined
        }
        <br />
        <br />
      </div>
  )
}