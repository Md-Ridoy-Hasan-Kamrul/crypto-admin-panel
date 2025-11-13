import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmHPLJc9ZAcWX71LjOqiTUyt2_mlhauM0",
  authDomain: "rainexchange1.firebaseapp.com",
  projectId: "rainexchange1",
  storageBucket: "rainexchange1.appspot.com", // ✅ fixed
  messagingSenderId: "831057004648",
  appId: "1:831057004648:web:0ed7fd571ac135d8a693dd",
  measurementId: "G-F9GWWKNZR9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
