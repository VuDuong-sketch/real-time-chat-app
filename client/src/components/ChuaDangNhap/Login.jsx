import { useRef } from "react"

export default function Login({login, moveToRegister}) {

  const username = useRef("");
  const password = useRef("");

  return (
    <div onKeyDown={(event) => {
      if (event.key === 'Enter') {
        login(username.current.value, password.current.value);
      }

    }}>
      <input ref={username} type="text" placeholder="username" /><br />
      <input ref={password} type="password" placeholder="password" /><br />
      <button onClick={() => login(username.current.value, password.current.value)}>Đăng Nhập</button>
      <p onClick={moveToRegister}>Bạn chưa có tài khoản?</p>
    </div>
  )
}