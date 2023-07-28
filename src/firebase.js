import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRMgTqF7DE9ChOM1ArWkWSG3h7qDrmKeQ",
  authDomain: "chit-chat-639b8.firebaseapp.com",
  projectId: "chit-chat-639b8",
  storageBucket: "chit-chat-639b8.appspot.com",
  messagingSenderId: "668083790832",
  appId: "1:668083790832:web:6a8b581b313b73758d3335"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
