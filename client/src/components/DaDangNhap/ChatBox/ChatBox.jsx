import "./ChatBox.css";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessages from "./ChatMessages/ChatMessages";
import ChatInput from "./ChatInput/ChatInput";
import { useEffect } from "react";
import { controller } from "../../../control";

export default function ChatBox({friend, back}) {

  return (
    <div className="chat-container">
      <ChatHeader name={friend} back={back} />
      <ChatMessages friend={friend} />
      <ChatInput friend={friend} />
    </div>
  )
}