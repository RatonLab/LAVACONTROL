// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBVVK3jY116yhmMMdzCY8C-aPr_YgxsuDU",
  authDomain: "lavacontrol-3a7b5.firebaseapp.com",
  projectId: "lavacontrol-3a7b5",
  storageBucket: "lavacontrol-3a7b5.firebasestorage.app",
  messagingSenderId: "545186241602",
  appId: "1:545186241602:web:f4292db921dab65e71a5db"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);