import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chat from "../pages/Chat";

export default function AppLayout() {
  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Navbar />
      <div className="flex-1 flex min-h-0 border">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
}