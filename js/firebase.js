// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlLGxeM4br2HcFJp6DSHGkQynRpLcLedo",
  authDomain: "muun-88d28.firebaseapp.com",
  databaseURL: "https://muun-88d28-default-rtdb.firebaseio.com/",
  projectId: "muun-88d28",
  storageBucket: "muun-88d28.appspot.com",
  messagingSenderId: "732481642680",
  appId: "1:732481642680:web:cda3a4e9d79cc056ad144d",
  measurementId: "G-J4N8PH8H1W",
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


$('#signin-btn').click( () => {
  const email = document.getElementById('username').value;
  const phone = document.getElementById('phone').value;
  const birthday = document.getElementById('birthday').value;
  const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth ,email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, 'users/', user.uid), {
        username: 'testtshitt',
        email: email
      })
      alert('User created with uid: ' + user.uid);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    })
});