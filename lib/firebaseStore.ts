import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyASt3bJMMzlJBHtOXlCQlCCwMoxL6wUpXM",
    authDomain: "gsw-ecell.firebaseapp.com",
    projectId: "gsw-ecell",
    storageBucket: "gsw-ecell.appspot.com",
    messagingSenderId: "941374804813",
    appId: "1:941374804813:web:107875221437da0bcb1d04",
    measurementId: "G-KN02HKFRVC"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase)
