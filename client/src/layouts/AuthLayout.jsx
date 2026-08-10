import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-screen flex justify-center items-center dark:bg-black dark:text-white">
      <Outlet />
    </div>
  );
}