import React from 'react';
import { Nav } from './components/Nav';
import { Content } from './components/Content';
import './App.css';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from './firebase-config';
import { useEffect } from 'react';
import { AuthWrapper } from './components/AuthWrapper';

function App() {

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [user, setUser] = useState({});

  // prevents infinite loop when you start typing inside an input
  useEffect (() => { 
    // handles login state whenever the user logs in or out
    onAuthStateChanged(auth, (currentUser => {
      setUser(currentUser);
    }))
  }, [])

// registers a users and does an automatically login for the user
const register = async () => {
  try {
    const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    console.log('user:', user);
  } catch (error) {
    console.log('error:', error.message);
  }
}

// login user
const login = async () => {
  try {
    const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log('user:', user);
  } catch (error) {
    console.log('error:', error.message);
  }
}

// logout user
const logout = async () => {
  await signOut(auth);
}

  return (
    <div className="App">
      <Nav />
      <Content />
      <div>
        <div>
          <h3>Register</h3>
          <input placeholder='Email...' onChange={(e) => {setRegisterEmail(e.target.value)}}/>
          <br></br>
         <input placeholder='Password...' onChange={(e) => {setRegisterPassword(e.target.value)}}/><br />
          <button onClick={register}>Create user</button>
        </div>
        <div>
          <h3>Login</h3>
          <input placeholder='Email...' onChange={(e) => {setLoginEmail(e.target.value)}}/>
          <br></br>
          <input type='password' placeholder='Password...' onChange={(e) => {setLoginPassword(e.target.value)}}/><br />
          <button onClick={login}>Login</button>
          <br />
          <br />
        </div>
        <div>
          logged user: <div>{user?.email}</div>
          <button onClick={logout}>Sign out</button>
        </div>
      </div>
      <AuthWrapper />
    </div>
  );
}

export default App;
