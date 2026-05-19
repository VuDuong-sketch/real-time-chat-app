import { useState } from "react"
import ChatBox from "./ChatBox/ChatBox"
import ChatSidebar from "./ChatSidebar/ChatSidebar"
import { controller } from "../../control";

export function DaDangNhap() {

  const [isChatBox, setIsChatBox] = useState(false);
  const [friend, setFriend] = useState(null);

  return (
    <>
      {!isChatBox && <ChatSidebar chooseFriend={(friend) => {
        setFriend(friend);
        setIsChatBox(true);
        controller.isChatBox = true;
      }} />}
      {isChatBox && <ChatBox friend={friend} back={() => {
        setFriend(null);
        setIsChatBox(false);
        controller.isChatBox = false;
      }} />}
    </>
  )
}