import { useEffect, useRef } from "react"
import "./ChatMessages.css"
import Message from "./Message/Message"

export default function ChatMessages({messages}) {

  const chatMessages = useRef();

  useEffect(() => {
    chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
  });

  return (
    <div ref={chatMessages} className="chat-messages" id="chatMessages">

      {messages.map((message, index) => <Message {...message} key={index} />)}

    </div>
  )
}