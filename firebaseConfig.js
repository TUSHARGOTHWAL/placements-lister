import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGeoX6JymG2e62GGsZK7uGujAHFFqDQkw",
  authDomain: "placement-lister-3a50c.firebaseapp.com",
  projectId: "placement-lister-3a50c",
  storageBucket: "placement-lister-3a50c.appspot.com",
  messagingSenderId: "220977921509",
  appId: "1:220977921509:web:b552fedb46a176bc72030c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage, collection, getDocs, addDoc, ref, uploadBytes, getDownloadURL };
