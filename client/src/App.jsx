import { useRef, useState } from "react"
import ChuaDangNhap from "./components/ChuaDangNhap/ChuaDangNhap";
import { DaDangNhap } from "./components/DaDangNhap/DaDangNhap"
import { controller } from './control';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function login(username, password) {
    if (await controller.login(username, password)) {
      setIsLoggedIn(true);
    }
  }

  return (
    <>
      {!isLoggedIn && <ChuaDangNhap login={login} />}
      {isLoggedIn && <DaDangNhap />}
    </>
  )
}