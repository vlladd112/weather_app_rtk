import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
  } from 'firebase/auth';

  // registers a users and does an automatically login for the user
// const register = async () => {
export async function register(auth, registerEmail, registerPassword) {
    try {
      const response = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log('user:', response);
      return response
    } catch (error) {
      console.log('error:', error.message);
    }
  }
  
  // login user
  export async function login(auth, loginEmail, loginPassword) {
    try {
      const response = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log('user:', response);
      return response;
    } catch (error) {
      console.log('error:', error.message);
    }
  }
  
  // logout user
  export async function logout(auth) {
    await signOut(auth);
  }