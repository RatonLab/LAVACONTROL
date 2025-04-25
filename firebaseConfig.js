// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBVVk3jY11GyhmMMdzCY8C-aPr_YgxsuDU",
  authDomain: "lavacontrol-3a7b5.firebaseapp.com",
  projectId: "lavacontrol-3a7b5",
  storageBucket: "lavacontrol-3a7b5.appspot.com", // ✔️ corregido
  messagingSenderId: "545106241602",
  appId: "1:545106241602:web:f4292db921dab65e71a5db"
};

const app = initializeApp(firebaseConfig);

export default app;
