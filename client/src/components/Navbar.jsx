import { useDispatch } from "react-redux";
import { fetchChats, logout } from "../store/actions";

export default function Navbar() {

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  function handleRefresh() {
    dispatch(fetchChats());
  }

  return (
    <div className="h-[60px] border flex justify-between items-center">
      <button onClick={handleRefresh} className="border cursor-pointer">Làm mới</button>
      <button onClick={handleLogout} className="border cursor-pointer">Đăng xuất</button>
    </div>
  );
}