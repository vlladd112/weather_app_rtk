import { useState, useEffect } from 'react';
import { UserForm } from './auth/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../firebase-config';
import { setLoginStatus, loginStatusFromState } from "../features/authentication/loginSlice";


export function AuthWrapper () {
  const [loginEmail, setLoginEmailx] = useState('');
  const [loginPassword, setLoginPasswordx] = useState('');
  let [showRegisterForm, setShowRegisterForm] = useState(false);
  let [showLoadingSpinner, setShowLoadingSpinner] = useState(false);

  const [loggedUser, setLoggedUser] = useState('')  // use the login user from auth

  const dispatch = useDispatch();


  const authenticationStatus = useSelector(loginStatusFromState);
  const currentUserX = loggedUser;

  const loginFormLinkAction = (e) => {
    e.preventDefault();
    setShowRegisterForm(!showRegisterForm);
  }

  // // LOGIN LIKE APP.JS
  const login = async (e) => {
    e.preventDefault();
    setShowLoadingSpinner(true);
    dispatch(setLoginStatus('loading'));
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log('user:', user);
    } catch (error) {
      console.log('error:', error.message);
    }
    dispatch(setLoginStatus('idle'));   //TODO. keep the same state as before "loading"(dispatch(setLoginStatus('loading')); - check to see what happens when you are signed in or mot signed in and use unvalid credentials
    setShowLoadingSpinner(false);
  }


  // prevents infinite loop when you start typing inside an input
  useEffect (() => { 
    console.log('dggfggfgfgfd', authenticationStatus);
    // handles login state whenever the user logs in or out
    onAuthStateChanged(auth, (currentUser => {
        dispatch(setLoggedUser(currentUser?.email))
    }))
  }, [])

  const loginFormConfig = {
    formName: 'Login',
    placeholder1: 'User...',
    placeholder2: 'Password...',
    setOption1: setLoginEmailx,
    setOption2: setLoginPasswordx,
    handleEvent: login,
    formLink: true,
    formLinkAction: loginFormLinkAction,
    showRegisterForm: showRegisterForm
  }


  if(authenticationStatus === 'loading') {
    return (
        <div>SIGNING IN...</div>
    )
  }

  if(authenticationStatus !== 'loading') {
    return (
        <div>
            <form className="login">
              {!showRegisterForm ?
                <UserForm formProps={loginFormConfig}/>
                :
                undefined
                // TODO add the register form below and replace showLoadingSpinner with authenticationStatus for spinner dosplay
                // <UserForm formName={'Register'} placeholder1={'User...'} placeholder2='Password...' setOption2={setRegisterEmailx} setLoginPasswordxxx={setRegisterPasswordx} handleEvent={login}/>
                }
                {showLoadingSpinner ? <p>signing in....</p> : undefined}
                <div>email: {loggedUser}</div>
                <div>password: {loginPassword}</div>
                <div>auth status: {authenticationStatus}</div>
                <div>USERX: {currentUserX}</div>
            </form>
          <br />
          <br />
        </div>
    )
  }
}