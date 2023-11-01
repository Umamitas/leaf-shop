import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection, //similmente a getRef ci permette di ottenere una collezione dall'array
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGOp99pZPzTz1Q3nQr0lbmyikSIJZqXn0",
  authDomain: "leaf-shop-db.firebaseapp.com",
  projectId: "leaf-shop-db",
  storageBucket: "leaf-shop-db.appspot.com",
  messagingSenderId: "961875179259",
  appId: "1:961875179259:web:878d15cbeb6ac9cb9fa25e",
};

const firebaseApp = initializeApp(firebaseConfig);

//##############################--- AUTHENTICATION ---#####################################
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

//############################--- UPLOADING DATAS ON FIREBASE ---#################################
export const addColletionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db); //così come per collectionRef come prima argomento passiamo il nostro database

  objectsToAdd.forEach((object) => {
    //per ognuno di questi elementi, batchalo e dividilo in scarpe, cappelli donne, uomo
    const docRef = doc(collectionRef, object.title.toLowerCase()); // collectionRef dice quale database stiamo usando
    batch.set(docRef, object);
  });

  await batch.commit();
};

//###############---UPLOADING DATAS FROM FIREBASE & MAP THEM---#####################
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q); //fetcha i documenti che vogliamo (q) in uno snapshop che vogliamo
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

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
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
