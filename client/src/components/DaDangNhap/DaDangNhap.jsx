import { useState, useReducer, useEffect } from "react"
import ChatBox from "./ChatBox/ChatBox"
import ChatSidebar from "./ChatSidebar/ChatSidebar"
import { controller, foo1 } from "../../control";

export function DaDangNhap() {

  const [state, setState] = useState("chat-sidebar");
  const [friend, setFriend] = useState(null);

  return (
    <>
      {state === "chat-sidebar" && <ChatSidebar chooseFriend={(friend) => {
        setFriend(friend);
        setState("chat-box");
      }} />}
      {state === "chat-box" && <ChatBox friend={friend} back={() => {
        setFriend(null);
        setState("chat-sidebar");
        controller.otherQueue.push(false); // báo cho thằng ChatMessages để nó không nghe tin nhắn nữa
      }} />}
    </>
  )
}

// let destUserName = "";
// let conversations = null;

// export default function DaDangNhap({ initConversations }) {
  
//   const reRender = useReducer(x => x + 1, 0)[1]; // render lại

//   const [state, setState] = useState(false);
//   const [header, setHeader] = useState({name: "abc"});
//   const [isListening, setIsListening] = useState(false);

  

//   if (!isListening) {
//     setIsListening(true);
//     conversations = initConversations;
//     (async () => {
//       while (true) {
//         const message = await controller.queue.pop();
//         pushMessage(destUserName, message);
//         console.log(destUserName);
//         reRender();
//       }
//     })();
//   }

//   const users = conversations.map((conversation) => {
//     if (conversation.username1 === controller.username) {
//       return { username: conversation.username2 }
//     } else {
//       return { username: conversation.username1 }
//     }
//   });


//   function getMessages(username) {
//     for (let i = 0; i < conversations.length; i++) {
//       const conversation = conversations[i];
//       const otherUsername = (conversation.username1 === controller.username ? conversation.username2 : conversation.username1);
//       if (otherUsername === username) {
//         return conversation.messages;
//       }
//     }
//     return [];
//   }

//   function pushMessage(username, message) {
//     for (let i = 0; i < conversations.length; i++) {
//       const conversation = conversations[i];
//       const otherUsername = (conversation.username1 === controller.username ? conversation.username2 : conversation.username1);
//       if (otherUsername === username) {
//         conversations[i].messages.push(message);
//       }
//     }
//   }

//   return (
//     <>
//       {state && <ChatBox
//         header={header}
//         messages={getMessages(header.name).map(message => ({
//           type: (message.sender === controller.username ? "my-message" : "other-message"),
//           content: message.content
//         }))}
//         back={() => setState(!state)}
//       />}
//       {!state && <ChatSidebar users={users} onClick={(username) => {
//         setState(!state);
//         setHeader({ avatar: "V", name: username });
//         destUserName = username;
//         setState(!state);
//         console.log(conversations);
//       }} />}
//     </>
//   )
// }