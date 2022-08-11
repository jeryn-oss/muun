// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from ''
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlLGxeM4br2HcFJp6DSHGkQynRpLcLedo",
  authDomain: "muun-88d28.firebaseapp.com",
  projectId: "muun-88d28",
  storageBucket: "muun-88d28.appspot.com",
  messagingSenderId: "732481642680",
  appId: "1:732481642680:web:cda3a4e9d79cc056ad144d",
  measurementId: "G-J4N8PH8H1W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
auth_state_listener.js
