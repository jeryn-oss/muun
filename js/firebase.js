// Import the functions you need from the SDKs you need
var script = document.createElement('script');
script.src = 'https://MomentJS.com/downloads/moment.js';
document.getElementsByTagName('head')[0].appendChild(script);
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, set, get, ref, update } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from 'https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js'
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";
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
    if (window.location.pathname == '/index.html') {
      document.location = '/pages/home/home.html'
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

console.log(user)

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

async function signup(username, email, phone, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + username.toLowerCase()), {
        dateCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
        uid: user.uid,
        username: username.toLowerCase(),
        email: email,
        phone: phone,
      })
        .then(() => {
          updateProfile(user, { displayName: username.toLowerCase() }).then(() => {
            $('#pass').css('font-size', '14px')
            $('#pass').text('user created')
            $('input').css('display', 'none')
            $('#buttons').css('display', 'none')
            $('.item').css('display', 'flex')
            setTimeout(() => {
              document.location = '/index.html'
            }, 5000);
          }).catch((err) => {
            console.log(err)
            $('#info').text('A problem occured')
            $('#info').css('opacity', '1')
            $('#info').css('color', 'red')
            setTimeout(() => {
              $('#info').css('opacity', '0')
            }, 8000)
          }
          )
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/email-already-in-use') {
        $('#info').text('Email already in use')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
          $('#info').css('opacity', '0')
        }, 8000)
      } else if (errorCode == 'auth/invalid-email') {
        $('#info').text('Invalid email')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
          $('#info').css('opacity', '0')
        }, 8000)
      } else if (errorCode == 'auth/weak-password') {
        $('#info').text('Weak password')
        $('#info').css('opacity', '1')
        $('#info').css('color', 'red')
        setTimeout(() => {
          $('#info').css('opacity', '0')
        }, 8000)
      }
    })
};

function signin(username, password, type) {
  $('#info').text('Signing in')
  $('#info').css('opacity', '1')
  $('#info').css('font-size', '14px')
  $('#info').css('color', 'var(--main)')
  $('button').css('display', 'none')
  $('input').css('display', 'none')
  $('.item').css('display', 'flex')
  $('#forgot-password').css('display', 'none')
  $('#pass').css('display', 'none')
  setTimeout(() => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        const user = userCredential.user;
        update(ref(database, 'users/' + user.displayName), {
          lastLogin: moment().format('MMMM Do YYYY, h:mm:ss a')
        });
        if (type == 'passwordchange') {
          update(ref(database, 'users/' + user.displayName), {
            lastPasswordChange: moment().format('MMMM Do YYYY, h:mm:ss a')
          });
          setTimeout(() => {
            document.location = '/pages/home/home.html'
          }), 2000;
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (validateEmail(username) != true) {
          get(ref(database, 'users/' + username.toLowerCase())).then((snapshot) => {
            $('#info').text('Signing in')
            $('#info').css('opacity', '1')
            $('#info').css('font-size', '14px')
            $('#info').css('color', 'var(--main)')
            $('button').css('display', 'none')
            $('input').css('display', 'none')
            $('.item').css('display', 'flex')
            $('#forgot-password').css('display', 'none')
            $('#pass').css('display', 'none')
            setTimeout(() => {
              if (snapshot.exists()) {
                const newUser = snapshot.val().email
                signInWithEmailAndPassword(auth, newUser, password)
                  .then((userCredential) => {
                    const user = userCredential.user;
                    update(ref(database, 'users/' + user.displayName), {
                      lastLogin: moment().format('MMMM Do YYYY, h:mm:ss a')
                    });
                  }).catch((error) => {
                    $('#info').css('font-size', '10px')
                    $('#info').text('incorect password or email/user')
                    $('#info').css('opacity', '1')
                    $('#info').css('color', 'red')
                    $('#info').css('color', 'red')
                    $('button').css('display', 'block')
                    $('input').css('display', 'flex')
                    $('.item').css('display', 'none')
                    $('#forgot-password').css('display', 'flex')
                    $('#pass').css('display', 'flex')
                    setTimeout(() => {
                      $('#info').css('opacity', '0')
                    }, 5000)
                  });
              } else {
                $('#info').css('font-size', '10px')
                $('#info').text('User does not exist')
                $('#info').css('opacity', '1')
                $('#info').css('color', 'red')
                $('button').css('display', 'block')
                $('input').css('display', 'flex')
                $('.item').css('display', 'none')
                $('#forgot-password').css('display', 'flex')
                $('#pass').css('display', 'flex')
                setTimeout(() => {
                  $('#info').css('opacity', '0')
                }, 5000)
              }
            }, 5000)
          })
        } else {
          $('#info').css('font-size', '10px')
          $('#info').text('incorect password or email/user')
          $('#info').css('opacity', '1')
          $('#info').css('color', 'red')
          $('#info').css('color', 'red')
          $('button').css('display', 'block')
          $('input').css('display', 'flex')
          $('.item').css('display', 'none')
          $('#forgot-password').css('display', 'flex')
          $('#pass').css('display', 'flex')
          setTimeout(() => {
            $('#info').css('opacity', '0')
          }, 5000)
        }
      })
  }, 5000);

}

function forgot(email) {
  sendPasswordResetEmail(auth, email)
    .then(function () {
      $('#pass').text('instructions sent to email')
      $('#conf-text').css('display', 'none')
      $('#text').css('display', 'none')
      $('#buttons').css('display', 'none')
      $('.item').css('display', 'flex')
      setTimeout(() => {
        document.location = '/index.html'
      }, 5000);
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
        signin(acountEmail, newPassword, 'passwordchange')
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

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function checkUsername(username) {
  return new Promise((resolve, reject) => {
    get(ref(database, 'users/' + username)).then((snapshot) => {
      if (snapshot.exists()) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

function confirmPhone(num) {
  return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(num);
}

export { signin };
export { signup };
export { signout };
export { forgot }
export { resetPassword }
export { getParameterByName }
export { confirmPhone }
export { validateEmail }
export { checkUsername }