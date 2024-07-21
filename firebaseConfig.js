import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3iMbGMJJ2t_XJvgoNt0vpSRXZydBOF5E",
  authDomain: "placement-lister.firebaseapp.com",
  projectId: "placement-lister",
  storageBucket: "placement-lister.appspot.com",
  messagingSenderId: "436544903378",
  appId: "1:436544903378:web:57275639ef9d59f29a750b",
  measurementId: "G-J3NJG4FKY4"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage, collection, getDocs, addDoc, ref, uploadBytes, getDownloadURL };
