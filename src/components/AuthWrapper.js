import { useState, useEffect } from 'react';
import { LoginForm } from './auth/LoginForm';
import { loginUser, setLoggedUser } from '../features/authentication/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, } from 'firebase/auth';
import { auth } from './../firebase-config';
import { currentUserFromState, authStatus } from '../features/authentication/loginSlice';
// import { useSelector } from 'react-redux';


export function AuthWrapper () {
  const [registerEmail, setRegisterEmailx] = useState('');
  const [registerPassword, setRegisterPasswordx] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loggedUser, setLoggedUser] = useState('')

  const dispatch = useDispatch();

  const authenticationStatus = useSelector(authStatus);
  const currentUserX = useSelector(currentUserFromState);


  // login user
const login = async (e) => {
    e.preventDefault();
    const params = {
        auth: auth,
        registerEmail: registerEmail,
        registerPassword: registerPassword
    }
    dispatch(loginUser(params));
    try {
    //   const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    //   console.log('user:', user);
    } catch (error) {
    //   console.log('error:', error.message);
    }
  }

  // // LOGIN LIKE APP.JS
  // const login = async () => {
  //   try {
  //     const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  //     console.log('user:', user);
  //   } catch (error) {
  //     console.log('error:', error.message);
  //   }
  // }


  // prevents infinite loop when you start typing inside an input
  useEffect (() => { 
    // handles login state whenever the user logs in or out
    onAuthStateChanged(auth, (currentUser => {
        // setLoggedUser(currentUser.email);
        dispatch(setLoggedUser(currentUser.email))
    }))
  }, [])


  if(authenticationStatus === 'loading') {
    return (
        <div>SIGNING IN...</div>
    )
  }

  if(authenticationStatus !== 'loading') {
    return (
        <div>
            <form className="login">
                <LoginForm formName={'Irina Loghin'} placeholder1={'user...'} placeholder2='password...' setLoginEmailxxx={setRegisterEmailx} setLoginPasswordxxx={setRegisterPasswordx} handleEvent={login}/>
                <div>email: {registerEmail}</div>
                <div>password: {registerPassword}</div>
                <div>auth status: {authenticationStatus}</div>
                <div>USERX: {currentUserX}</div>
            </form>

          <br />
          <br />
        </div>
    )
  }


    // return (
    //     <div>
    //         <form className="login">
    //             <LoginForm formName={'Irina Loghin'} placeholder1={'user...'} placeholder2='password...' xxx={setRegisterEmailx} yyy={setRegisterPasswordx} handleEvent={login}/>
    //             <div>email: {registerEmail}</div>
    //             <div>email: {registerPassword}</div>
    //         </form>

    //       <br />
    //       <br />
    //     </div>
    // )
}