import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function ChuaDangNhap({login}) {

  const [state, setState] = useState("login-interface");

  return (
    <>
      {state === "login-interface" && <Login login={login} moveToRegister={() => setState("register-interface")} />}
      {state === "register-interface" && <Register moveToLogin={() => setState("login-interface")} />}
    </>
  )
}