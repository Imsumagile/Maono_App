import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBWBs-DPjFFpVjm_Kcna5PE5Jf_L7DofH8",
    authDomain: "kikoba-app-28064.firebaseapp.com",
    projectId: "kikoba-app-28064",
    storageBucket: "kikoba-app-28064.firebasestorage.app",
    messagingSenderId: "496818688394",
    appId: "1:496818688394:web:61b33f4aede1cf3a9cb873"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence to keep users logged in
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export default app;
