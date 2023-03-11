import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCuYgDYnkYoKW6tRHvOX3Rh696aw1yPSKA",
  authDomain: "pet-sentry-2023.firebaseapp.com",
  projectId: "pet-sentry-2023",
  storageBucket: "pet-sentry-2023.appspot.com",
  messagingSenderId: "143280941358",
  appId: "1:143280941358:web:38e9f1ca73e4cad43132bf",
  measurementId: "G-6WV3QJBW8V",
};

firebase.initializeApp(firebaseConfig);

export { firebase };
