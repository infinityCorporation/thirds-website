import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgSOa1L8ajabGBkj1Vywkvd2HnfTk44B8",
  authDomain: "thirds-f5a7d.firebaseapp.com",
  projectId: "thirds-f5a7d",
  storageBucket: "thirds-f5a7d.firebasestorage.app",
  messagingSenderId: "272718267949",
  appId: "1:272718267949:web:23403cebb457a013c6daa4",
  measurementId: "G-PZSWCHVB77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;