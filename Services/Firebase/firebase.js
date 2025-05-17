import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyCmNAmc03WvWZXk1u67UWVnkLu0le6AmKA",
    authDomain: "practise-app-578e0.firebaseapp.com",
    projectId: "practise-app-578e0",
    storageBucket: "practise-app-578e0.firebasestorage.app",
    messagingSenderId: "345355630835",
    appId: "1:345355630835:web:3c7de1a3cd014051b55f86",
    measurementId: "G-Q9PYBSLW6X"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const storage = getStorage(app);

  export { app, auth, storage }