// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBY1oujbZXr5TIFR-i2ylpoYcKimANZGb8",
    authDomain: "scrapy-3de4d.firebaseapp.com",
    projectId: "scrapy-3de4d",
    storageBucket: "scrapy-3de4d.firebasestorage.app",
    messagingSenderId: "945564580375",
    appId: "1:945564580375:web:a675bcc31928c930a73a52",
    measurementId: "G-2907XL5WZS"
};

export const GoogleProvider = new GoogleAuthProvider();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)