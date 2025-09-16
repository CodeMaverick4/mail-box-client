import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADlE9XtphNjvJg1YtSO3BU0DZ8MXwCQGE",
  authDomain: "todo-app-75d12.firebaseapp.com",
  projectId: "todo-app-75d12",
  storageBucket: "todo-app-75d12.firebasestorage.app",
  messagingSenderId: "1014793460570",
  appId: "1:1014793460570:web:4ea23349d8a3d3b179b163"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);