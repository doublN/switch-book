import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC15hpnCra3iuHNw9q1gbxerBHY5MZalEA",
    authDomain: "switchbook-225b3.firebaseapp.com",
    projectId: "switchbook-225b3",
    storageBucket: "switchbook-225b3.appspot.com",
    messagingSenderId: "731886943527",
    appId: "1:731886943527:web:af3ffaf1fd4932b30cfd02",
  };
  
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const firestore = getFirestore(app);