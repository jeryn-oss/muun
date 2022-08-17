// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'

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
    if ((window.location.pathname) == '/index.html') {
      window.location = '/pages/home/home.html'
    }
  } else {
    if (window.location.pathname != '/index.html' && window.location.pathname != '/pages/signup/signup.html' && window.location.pathname != "/pages/forgot/forgot.html" && window.location.pathname != "/pages/reset/reset.html") {
      window.location = '/index.html'
    }
  }
});

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

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

function signup(username, email, phone, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      set(ref(database, 'users/' + username), {
        uid: user.uid,
        username: username,
        email: email,
        phone: phone,
      })
        .then(() => {
          window.location.href = '/index.html'
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      throw 'not posible'
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

function forgot(email) {
  sendPasswordResetEmail(auth, email)
    .then(function () {

    })
    .catch(function (error) {
      var msg;
      if (error.message == 'Firebase: Error (auth/user-not-found).') {
        msg = 'user not found'
      } else if (error.message == 'Firebase: Error (auth/invalid-email).') {
        msg = 'invalid email'
      } else if (error.message == 'Firebase: Error (auth/too-many-requests).') {
        msg = 'to many attempts'
      }
      else {
        msg = 'a problem ocurred'
        console.log(error.message)
      }
      $('#info').text(msg)
      $('#info').css('opacity', '1')
      $('#info').css('color', 'red')
      setTimeout(() => {
        $('#info').css('opacity', '0')
      }, 5000)
    });
}

function resetPassword(actionCode, newPass, continueUrl, lang) {
  verifyPasswordResetCode(auth, actionCode).then((email) => {
    const acountEmail = email
    const newPassword = newPass

    confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {
      $('#pass').text('password changed')
      $('#conf-text').css('display', 'none')
      $('#text').css('display', 'none')
      $('#submit-btn').css('display', 'none')
      $('.item').css('display', 'flex')
      setTimeout(() => {
        document.location = '/index.html'
      }, 5000);
    }).catch((error) => {
      console.log(error)
    });
  }).catch((error) => {
    $('#info').text('link expired')
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
export { forgot }
export { resetPassword }
export { getParameterByName }