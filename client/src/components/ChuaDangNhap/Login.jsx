import { useRef } from "react"

export default function Login({login}) {

  const username = useRef("");
  const password = useRef("");

  return (
    <>
      <input ref={username} type="text" placeholder="username" /><br />
      <input ref={password} type="password" placeholder="password" /><br />
      <button onClick={() => login(username.current.value, password.current.value)}>Đăng Nhập</button>
    </>
  )
}