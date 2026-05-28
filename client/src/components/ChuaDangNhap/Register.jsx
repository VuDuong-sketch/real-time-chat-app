import { useRef } from "react"
import { controller } from "../../control";

export default function Register({moveToLogin}) {

  const username = useRef("");
  const password = useRef("");

  async function handleClick() {
    if (await controller.register(username.current.value, password.current.value)) {
      alert("Đăng ký thành công!");
    } else {
      alert("Đăng ký thất bại!");
    }
  }

  return (
    <div onKeyDown={(event) => {
      if (event.key === 'Enter') {
        handleClick();
      }

    }}>
      <input ref={username} type="text" placeholder="username" /><br />
      <input ref={password} type="password" placeholder="password" /><br />
      <button onClick={handleClick}>Đăng ký</button>
      <p onClick={moveToLogin}>Bạn đã có tài khoản?</p>
    </div>
  )
}