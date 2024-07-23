import { initializeApp } from "firebase/app";

//Firebase Firestore
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

//Firebase Realtime Database
import {
  getDatabase,
  set,
  get,
  remove,
  ref as databaseRef,
  onValue,
} from "firebase/database";

// Firebase Auth
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  updateEmail as authUpdateEmail,
  updatePassword as authUpdatePassword,
} from "firebase/auth";

// Firestore Storage
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

// Importing Firebase Keys
import firebaseKeys from "./conf.js";

const firebaseConfig = {
  apiKey: firebaseKeys.apiKey,
  authDomain: firebaseKeys.authDomain,
  projectId: firebaseKeys.projectId,
  storageBucket: firebaseKeys.storageBucket,
  messagingSenderId: firebaseKeys.messagingSenderId,
  appId: firebaseKeys.appId,
  databaseURL: firebaseKeys.VITE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
const database = getDatabase(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Export Firebase services and utilities
export {
  app,
  db,
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  collection,
  setDoc,
  doc,
  onSnapshot,
  getDoc,
  getDocs,
  storage,
  authUpdateEmail as updateEmail,
  authUpdatePassword as updatePassword,
  storageRef,
  getDownloadURL,
  uploadBytesResumable,
  updateDoc,
  addDoc,
  deleteDoc,
  databaseRef,
  database,
  set,
  get,
  remove,
  onValue,
};
