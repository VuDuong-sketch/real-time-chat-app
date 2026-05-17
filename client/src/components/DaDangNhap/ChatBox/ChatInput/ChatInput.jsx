import { useRef } from "react"
import "./ChatInput.css"
import { controller } from "../../../../control";

export default function ChatInput({destUsername}) {

  const input = useRef();

  return (
    <div className="chat-input" onKeyDown={(event) => {
      if (event.key === 'Enter') {
        controller.send({
          sender: controller.username,
          receiver: destUsername,
          content: input.current.value
        });
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
        controller.send({
          sender: controller.username,
          receiver: destUsername,
          content: input.current.value
        });
        input.current.value = "";
      }}>
        Gửi
      </button>

    </div>
  )
}