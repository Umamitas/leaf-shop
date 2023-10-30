import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGOp99pZPzTz1Q3nQr0lbmyikSIJZqXn0",
  authDomain: "leaf-shop-db.firebaseapp.com",
  projectId: "leaf-shop-db",
  storageBucket: "leaf-shop-db.appspot.com",
  messagingSenderId: "961875179259",
  appId: "1:961875179259:web:878d15cbeb6ac9cb9fa25e",
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider); //creo un nuovo sign in

export const db = getFirestore(); //ci permette di entrare nel database
/*controlla se c'è un riferimento già esistente */
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef); // con questo controlli se esiste già nel database, altrimenti crealo

  //-----------SE NON ESISTE--------------
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; //nome e email di chi si registra
    const createdAt = new Date(); //imposta la data di registrazione

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //--------------------SE ESISTE---------------------
  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};
