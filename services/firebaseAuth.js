// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import {initializeAuth, getReactNativePersistence, getAuth} from "firebase/auth"
import reactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhAOUyF-lQxy6DQHcRWXVh18uXM1ScOwk",
  authDomain: "react-native-auth-demo-677b0.firebaseapp.com",
  projectId: "react-native-auth-demo-677b0",
  storageBucket: "react-native-auth-demo-677b0.appspot.com",
  messagingSenderId: "1038859852671",
  appId: "1:1038859852671:web:17401a7e6c47805c05d84a"
};

let auth;
if(getApps().length == 0) {
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
auth = initializeAuth(app,{
    persistence: getReactNativePersistence(reactNativeAsyncStorage)
});
}else{
    auth = getAuth();
}


export default auth;
