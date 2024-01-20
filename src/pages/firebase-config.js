// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrIEPfe5uRZg1Lt2r1yhoNwAtoGwumMmI",
  authDomain: "netflix-e6acc.firebaseapp.com",
  projectId: "netflix-e6acc",
  storageBucket: "netflix-e6acc.appspot.com",
  messagingSenderId: "56817360776",
  appId: "1:56817360776:web:3f6890d0a119334234643d",
  databaseURL: process.env.DATA_BASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);