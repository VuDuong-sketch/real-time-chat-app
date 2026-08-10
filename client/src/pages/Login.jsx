import { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/actions";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const dispatch = useDispatch();

  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleLogin() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    dispatch(login(username, password));
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleLogin();
    }
  }

  const navigate = useNavigate();
  function moveToRegister() {
    navigate('/register');
  }

  return (
    <div className="w-[600px] border flex flex-col rounded-lg">
      <input ref={usernameRef} onKeyDown={handleKeyDown} className="border outline-none h-[50px] m-[5px] rounded-lg" type="text" placeholder="username" />
      <input ref={passwordRef} onKeyDown={handleKeyDown} className="border outline-none h-[50px] m-[5px] rounded-lg" type="password" placeholder="password" />
      <button onClick={handleLogin} className="border h-[50px] m-[5px] cursor-pointer hover:bg-gray-300 rounded-lg">Đăng nhập</button>
      <button onClick={moveToRegister} className="border h-[50px] m-[5px] cursor-pointer hover:bg-gray-300 rounded-lg">Bạn chưa có tải khoản?</button>
    </div>
  );
}