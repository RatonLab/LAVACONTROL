import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore'; // 👈 agrega Firestore

// 🔐 Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBVVk3jY11GyhmMMdzCY8C-aPr_YgxsuDU",
  authDomain: "lavacontrol-3a7b5.firebaseapp.com",
  projectId: "lavacontrol-3a7b5",
  storageBucket: "lavacontrol-3a7b5.firebasestorage.app",
  messagingSenderId: "545106241602",
  appId: "1:545106241602:web:f4292db921dab65e71a5db"
};

// 🚀 Inicializa la app
const app = initializeApp(firebaseConfig);

// 🔒 Inicializa Auth con persistencia de sesión
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// 🔥 Inicializa Firestore
const db = getFirestore(app);

// 📦 Exporta todo
export { app, auth, db };
