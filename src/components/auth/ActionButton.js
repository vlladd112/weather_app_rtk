// import { useState } from 'react';
// import { LoginForm } from './auth/LoginForm';

export function ActionButton ({ handleEvent }) {
  
    return (
        <div>
          <button onClick={handleEvent}>Login</button>
          <br />
          <br />
        </div>
    )
}