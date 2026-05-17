import "./ChatBox.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";

export default function ChatBox({header, messages, back}) {

  return (
    <div className="chat-container">
      <ChatHeader {...header} back={back} />
      <ChatMessages messages={messages} />
      <ChatInput destUsername={header.name} />
    </div>
  )
}