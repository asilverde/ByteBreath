import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBwDnw-KtNPWnUQhZRQ-MWU793oc-97ydE",
  authDomain: "bytebreathe.firebaseapp.com",
  projectId: "bytebreathe",
  storageBucket: "bytebreathe.appspot.com",
  messagingSenderId: "625662290201",
  appId: "1:625662290201:web:aa6e5db68bddafd9e73d88",
  measurementId: "G-1YS1YMW7HP"
};

getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();

export {auth}