import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUSXPDL2jK8BJumgM51T-U_OeBhF4qOPg",
  authDomain: "propertyhub-566e3.firebaseapp.com",
  projectId: "propertyhub-566e3",
  storageBucket: "propertyhub-566e3.appspot.com",
  messagingSenderId: "30048028568",
  appId: "1:30048028568:web:65ace7c077ba45a4c5cded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
