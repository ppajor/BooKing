import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDrM91eALaVqRbprhup141EOaicvcKDw_Y",
  authDomain: "booking-dcd73.firebaseapp.com",
  databaseURL: "https://booking-dcd73.firebaseio.com",
  projectId: "booking-dcd73",
  storageBucket: "booking-dcd73.appspot.com",
  messagingSenderId: "632874528999",
  appId: "1:632874528999:web:8be5d26df58108eadd7242",
  measurementId: "G-33K44LPF8L",
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default firebase;
