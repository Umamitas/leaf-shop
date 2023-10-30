import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";
// valore reale a cui voglio accedere

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

//qui stabilisco i component (children) a cui questi dati sono disponibili tramite useState
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  //questo useEffect tiene traccia di tutti i cambiamenti di stato login/logout

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};
