import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: "weather-app-rtk",
    storageBucket: "weather-app-rtk.appspot.com",
    messagingSenderId: "985316124940",
    appId: "1:985316124940:web:d579990ad6a2ad0d40c129",
    measurementId: "G-9V8BTFB15J"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);