import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //ci permette di entrare nel database
/*controlla se c'è un riferimento già esistente */
export const createUserDocumentFromAuth = async (userAuth) => {
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
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  //--------------------SE ESISTE---------------------
  return userDocRef;

};
