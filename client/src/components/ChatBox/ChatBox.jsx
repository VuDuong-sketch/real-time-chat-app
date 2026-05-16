import { useReducer } from "react";
import "./ChatBox.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";

export default function ChatBox({header, messages}) {
  const forceUpdate = useReducer(x => x + 1, 0)[1]; // render lại

  return (
    <div className="chat-container">
      <ChatHeader {...header} />
      <ChatMessages messages={messages} />
      <ChatInput send={(content) => {
        messages.push({
          type: "my-message",
          time: new Date().getHours().toString().padStart(2, "0") + ":" + new Date().getMinutes().toString().padStart(2, "0"),
          content: content
        });
        forceUpdate();
      }} />
    </div>
  )
}