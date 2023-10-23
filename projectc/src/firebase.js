// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_ND7vLWi49oB6tGQK8ykKGqiao5tZpDk",
  authDomain: "projectc-b0141.firebaseapp.com",
  projectId: "projectc-b0141",
  storageBucket: "projectc-b0141.appspot.com",
  messagingSenderId: "67141105752",
  appId: "1:67141105752:web:b0162b30e84b7707a7f22d",
  measurementId: "G-8LJP293ECZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth=getAuth(app);
export {auth,db}