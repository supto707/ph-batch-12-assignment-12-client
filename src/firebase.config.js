import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCFUJ3KE9jHyw0QuvfmsOb_nRvOqAkFIIA",
  authDomain: "ph-b12-a12.firebaseapp.com",
  projectId: "ph-b12-a12",
  storageBucket: "ph-b12-a12.firebasestorage.app",
  messagingSenderId: "280662291338",
  appId: "1:280662291338:web:7946c5dc69081286cf4e73"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
