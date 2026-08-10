import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn) return <Navigate to={'/chats'} />
  else return <Outlet />
}