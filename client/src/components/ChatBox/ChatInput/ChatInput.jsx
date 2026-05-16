import { useRef } from "react"
import "./ChatInput.css"

export default function ChatInput({send}) {

  const input = useRef();

  return (
    <div className="chat-input" onKeyDown={(event) => {
      if (event.key === 'Enter') {
        send(input.current.value);
        input.current.value = "";
      }

    }}>

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