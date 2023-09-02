import { createContext, useContext, useReducer } from "react";
import { DataReducer } from "./Reducer";

//Initialisation de l'etat Contexte
const INITIAL_DATA = {};

//Creation du contexte
const DataCreateContexte = createContext(INITIAL_DATA);

const DataContext = ({ children }) => {
  const [state, dispatch] = useReducer(DataReducer, INITIAL_DATA);
  return (
    <DataCreateContexte.Provider value={{ state, dispatch }}>
      {children}
    </DataCreateContexte.Provider>
  );
};

const useDataContexte = () => useContext(DataCreateContexte);

export { DataContext, useDataContexte };
