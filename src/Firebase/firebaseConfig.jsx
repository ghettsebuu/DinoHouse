import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBf9VM_D8OJEJXBSo9yzCyn2nAnQgcgvoI",
  authDomain: "dinohouse-e47c7.firebaseapp.com",
  databaseURL: "https://dinohouse-e47c7-default-rtdb.firebaseio.com",
  projectId: "dinohouse-e47c7",
  storageBucket: "dinohouse-e47c7.appspot.com",
  messagingSenderId: "96225709922",
  appId: "1:96225709922:web:47729695043f23e79f263b",
  measurementId: "G-JH303FY75J"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Obtén una instancia de la autenticación
export const auth = getAuth(app);

// Obtén una referencia a la base de datos
export const db = getDatabase(app); // Asegúrate de exportar db

export default app;