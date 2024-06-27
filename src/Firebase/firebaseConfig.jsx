// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logOut = () => signOut(auth);

export default app;



