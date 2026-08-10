import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (!isLoggedIn) return <Navigate to={'/login'} />
  else return <Outlet />
}