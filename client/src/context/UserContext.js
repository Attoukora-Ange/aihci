import { createContext, useContext, useEffect, useReducer } from "react";
import { userReducer } from "./Reducer";

//Initialisation de l'etat
const INITIAL_USER = {
  user: JSON.parse(localStorage.getItem("user")),
  error: null,
};

//Creation de contexte
const UserCreateContexte = createContext(INITIAL_USER);

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_USER);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user ));
  }, [state.user]);

  return (
    <UserCreateContexte.Provider value={{ user: state.user, dispatch }}>
      {children}
    </UserCreateContexte.Provider>
  );
};

const useUserContexte = () => useContext(UserCreateContexte);

export { UserContext, useUserContexte };
