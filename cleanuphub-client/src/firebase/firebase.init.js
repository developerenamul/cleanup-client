// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCObuEJBJe__3dbGzd6czk7SsD2OBypX0w",
  authDomain: "cleanup-auth.firebaseapp.com",
  projectId: "cleanup-auth",
  storageBucket: "cleanup-auth.firebasestorage.app",
  messagingSenderId: "418601757115",
  appId: "1:418601757115:web:eca9ddd15d3e186641fc9e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
