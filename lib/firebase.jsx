import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAA6svClzRk2wdFedNbKhEIuxKXpgiVLpk",
    authDomain: "prologue-blog.firebaseapp.com",
    projectId: "prologue-blog",
    storageBucket: "prologue-blog.appspot.com",
    messagingSenderId: "288780393591",
    appId: "1:288780393591:web:3066a87629cceeb418fa72",
    measurementId: "G-14RFC9HX69"
};

const app = initializeApp(firebaseConfig);

let analytics;
if (typeof window !== 'undefined') {
    // Dynamic import for getAnalytics to ensure it runs only in client-side
    import("firebase/analytics").then(({ getAnalytics }) => {
        analytics = getAnalytics(app);
    });
}

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();
