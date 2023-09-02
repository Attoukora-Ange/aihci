import { Navigate, Outlet } from "react-router-dom";
import { useUserContexte } from "../context/UserContext";

export const ProtectedRoute = () => {
  const { user } = useUserContexte();
  return <>{user ? <Outlet /> : <Navigate to="/connexion" />}</>;
};
