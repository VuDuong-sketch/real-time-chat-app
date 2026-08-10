import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function InvalidRoute() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  if (isLoggedIn) return <Navigate to={'/chats'} />
  else return <Navigate to={'/login'} />
}