// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA30OnqUi0BcGVFLp6vm4xyo7484pICNeQ",
  authDomain: "plant-grass.firebaseapp.com",
  projectId: "plant-grass",
  storageBucket: "plant-grass.appspot.com",
  messagingSenderId: "779266560549",
  appId: "1:779266560549:web:c27b28ab629fd59ebf65cc",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
export const fireStore = getFirestore(firebaseApp);
