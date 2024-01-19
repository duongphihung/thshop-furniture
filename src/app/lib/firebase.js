// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_APIKEY,
    authDomain:  process.env.NEXT_PUBLIC_FB_AUTHDOMAIN,
    projectId:  process.env.NEXT_PUBLIC_FB_PROJECTID,
    storageBucket:  process.env.NEXT_PUBLIC_FB_STOREGEBUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_SENDERID,
    appId:  process.env.NEXT_PUBLIC_FB_APPID,
    measurementId:  process.env.NEXT_PUBLIC_FB_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDB = getStorage(app);