import { useEffect, useRef, useReducer } from "react"
import "./ChatMessages.css"
import Message from "./Message/Message"
import { controller } from "../../../../control"

export default function ChatMessages({friend}) {

  const reRender = useReducer(x => x + 1, 0)[1]; // render lại

  const messages = controller.getMessages(friend);

  const chatMessages = useRef();
  useEffect(() => {
    chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
  });

  useEffect(() => {
    console.log("Chạy useEffect");
    controller.updateMessagesInChatBox = reRender;
  }, [])

  return (
    <div ref={chatMessages} className="chat-messages" id="chatMessages">

      {messages.map((message, index) => <Message type={(message.sender === controller.username ? "my-message" : "other-message")} content={message.content} key={index} />)}

    </div>
  )
}