// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'
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
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    /*/ 
    if ((window.location.pathname) == '/index.html') {
      window.location = '/pages/home/home.html'
    }
    /*/
    console.log('hhhhh')
  } else {
    if (window.location.pathname != '/index.html' || window.location.pathname != '/pages/signup/signup.html') {
      window.location = '/index.html'
    }else {
      console.log(window.location.pathname)
    }
  
    
  }
});

function signout() {
  signOut(auth).then(() => {
    const dt = new Date();
    update(ref(database, 'users/' + user.uid), {
      last_logout: dt.toString()
    });

  }).catch(
    (error) => {

    });
}

function signup(username, email, phone, birthday, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
        phone: phone,
        birthday: birthday,
      })
        .then(() => {
          window.location.href = '/index.html'
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    })
};

function signin(username, password) {
  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;

      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_Login: dt,
      });
      window.location.href = '/pages/home/home.html'
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      $('#info').text('User not found')
      $('#info').css('opacity', '1')
      $('#info').css('color', 'red')
      setTimeout(() => {
        $('#info').css('opacity', '0')
      }, 5000)
    })
}

export { signin };
export { signup };
export { signout };