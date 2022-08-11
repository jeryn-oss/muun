import { initializeApp } from "/node_modules/firebase/app"
import { getAnalytics } from "/node_modules/firebase/analytics";
import { getAuth, onAuthStateChanged } from "/node_modules/firebase/auth";

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
    
    const uid = user.uid;

  } else {
    console.log('user is signed out')
  }
});

