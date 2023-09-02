import { Outlet } from "react-router-dom";
import { Home } from "./Home";
import { useUserContexte } from "../context/UserContext";

export const ProtectedAdminRoute = () => {
  const { user } = useUserContexte();
  return <>{user?.isAdmin ? <Outlet /> : <Home />}</>;
};
