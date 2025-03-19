import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5Lfr77wHo1MWtEs2TCifJFFu73mQSKpQ",
  authDomain: "fucecchio-react.firebaseapp.com",
  projectId: "fucecchio-react",
  storageBucket: "fucecchio-react.firebasestorage.app",
  messagingSenderId: "615957528741",
  appId: "1:615957528741:web:1d67ac7b20e7e1eef50d4c"
};

const app = initializeApp(firebaseConfig);

// Ottieni istanze di Auth e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };