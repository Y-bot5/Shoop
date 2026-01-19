// Shoop/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD6bBqUlQe32d7dZRmJane3gAsttTCZyPs",
      authDomain: "shoop-hu4f.firebaseapp.com",
        projectId: "shoop-hu4f",
          storageBucket: "shoop-hu4f.firebasestorage.app",
            messagingSenderId: "291613688377",
              appId: "1:291613688377:web:6beb609208a1e22da403e8"
              };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  app,
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
};
