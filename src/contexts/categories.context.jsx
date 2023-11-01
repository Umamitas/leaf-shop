import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
  categoriesMap: {}, //usiamo gli oggetti per usare le chiavi oggetto
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    //ogni funzione async che usiamo con useEffect necessità di una funzione di callback che richiami async, per evitare problemi
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  /* Questo useEffect aggiunge alla collezione il file Shop_data ma dopo il primo run conviene rimuoverlo,
   altrimenti continuerà ad aggiungere elementi

  useEffect(() => {
    addColletionAndDocuments("categories", SHOP_DATA );
  }, []);

  Una volta caricati i dati non ci serve più ricaricarli ad ogni render
*/

  const value = { categoriesMap };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
