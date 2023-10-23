// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY2TxX6wRye_YmBrN6cEhfwmFEQc5ELfM",
  authDomain: "ypages-f56db.firebaseapp.com",
  projectId: "ypages-f56db",
  storageBucket: "ypages-f56db.appspot.com",
  messagingSenderId: "482693955311",
  appId: "1:482693955311:web:7b800222c95daaeabae51a",
  measurementId: "G-98V5HE1C5B"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);
export {auth,db}