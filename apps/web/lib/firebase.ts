// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5zn_jhqAZehzSvGACMDccHRy6S2w3Lnc",
  authDomain: "bidding-9970d.firebaseapp.com",
  projectId: "bidding-9970d",
  storageBucket: "bidding-9970d.firebasestorage.app",
  messagingSenderId: "992383993371",
  appId: "1:992383993371:web:e5e3f289110b0906999abe",
  measurementId: "G-C65PYJJJZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth}