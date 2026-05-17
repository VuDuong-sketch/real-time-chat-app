import { useRef, useState } from "react"
import ChuaDangNhap from "./components/ChuaDangNhap/ChuaDangNhap";
import DaDangNhap from "./components/DaDangNhap/DaDangNhap"
import { controller } from './control';

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const data = useRef([]);

  async function login(username, password) {
    const msg = await controller.login(username, password);
    if (msg !== false) {
      setIsLoggedIn(true);
      data.current = msg;
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      {!isLoggedIn && <ChuaDangNhap login={login} />}
      {isLoggedIn && <DaDangNhap initConversations={data.current} />}
    </>
  )
}