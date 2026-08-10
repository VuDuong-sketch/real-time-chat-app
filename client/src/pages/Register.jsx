import { useRef } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/actions";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const dispatch = useDispatch();

  const usernameRef = useRef();
  const passwordRef = useRef();

  function handleRegister() {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    dispatch(register(username, password));
  }

  const navigate = useNavigate();
  function moveToLogin() {
    navigate('/login');
  }

  return (
    <div className="w-[600px] border flex flex-col rounded-lg">
      <input ref={usernameRef} className="border outline-none h-[50px] m-[5px] rounded-lg" type="text" placeholder="username" />
      <input ref={passwordRef} className="border outline-none h-[50px] m-[5px] rounded-lg" type="password" placeholder="password" />
      <button onClick={handleRegister} className="border h-[50px] m-[5px] cursor-pointer hover:bg-gray-300 rounded-lg">Đăng ký</button>
      <button onClick={moveToLogin} className="border h-[50px] m-[5px] cursor-pointer hover:bg-gray-300 rounded-lg">Bạn đã có tải khoản?</button>
    </div>
  );
}