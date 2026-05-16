import { useRef } from "react"
import "./ChatInput.css"

export default function ChatInput({send}) {

  const input = useRef();

  return (
    <div className="chat-input">

      <input
        ref={input}
        type="text"
        id="messageInput"
        placeholder="Nhập tin nhắn..."
      />

      <button onClick={() => {
        send(input.current.value);
        input.current.value = "";
      }}>
        Gửi
      </button>

    </div>
  )
}