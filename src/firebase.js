// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADlE9XtphNjvJg1YtSO3BU0DZ8MXwCQGE",
  authDomain: "todo-app-75d12.firebaseapp.com",
  projectId: "todo-app-75d12",
  storageBucket: "todo-app-75d12.firebasestorage.app",
  messagingSenderId: "1014793460570",
  appId: "1:1014793460570:web:4ea23349d8a3d3b179b163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);