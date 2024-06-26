
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { collection, addDoc } from "firebase/firestore"; 



const firebaseConfig = {
  apiKey: "AIzaSyBYONir5HP332zUCNVqiNoDJ7kThue1NY4",
  authDomain: "myform-274ef.firebaseapp.com",
  projectId: "myform-274ef",
  storageBucket: "myform-274ef.appspot.com",
  messagingSenderId: "1066304918291",
  appId: "1:1066304918291:web:cc2d1f74b21bd2654200e6",
  measurementId: "G-BQ9MMSSVJ3"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth =getAuth(app);