import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);