import { io } from "socket.io-client";
import { AsyncQueue } from "./AsyncQueue";

const socket = io("http://localhost:3001");

export let foo1 = () => {};
export let foo2 = () => {};

export const controller = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
  data: null,  // mảng các cuộc trò chuyện
  queue: new AsyncQueue(),
  otherQueue: new AsyncQueue(),

  login: async function (username, password) { // true or false

    let foo = null;

    socket.on("login", msg => {
      foo(msg);
    });

    socket.emit("login", {username: username, password: password});

    const msg = await new Promise(resolve => {foo = resolve;});

    if (msg !== false) {
      this.isLoggedIn = true;
      this.username = username;
      this.password = password;
      this.data = msg;
      return true;
    }

    return false;
  },

  send(message) {
    socket.emit("chat", message);
  },

  run() {

    (async () => {
      while (true) {
        this.queue.push(await this.otherQueue.pop())
      }
    })();

    socket.on("chat", message => {

      const friendUsernameOfTheMessage = (message.sender === this.username ? message.receiver : message.sender);

      for (let i = 0; i < this.data.length; i++) {
        const conversation = this.data[i];
        const friendUsernameOfThisConversation = (conversation.username1 === this.username ? conversation.username2 : conversation.username1);
        if (friendUsernameOfThisConversation === friendUsernameOfTheMessage) {
          this.data[i].messages.push(message);
          break;
        }
      }

      if (this.queue.queue.length === 0) {
        this.queue.push(true);
      }
      
    })
  },

  getMessages(friend) {
    for (let i = 0; i < this.data.length; i++) {
      const conversation = this.data[i];
      const friendUsernameOfThisConversation = (conversation.username1 === this.username ? conversation.username2 : conversation.username1);
      if (friendUsernameOfThisConversation === friend) {
        return conversation.messages;
      }
    }
  },

  getFriends() { // mảng các username của các friend
    //   const users = conversations.map((conversation) => {
//     if (conversation.username1 === controller.username) {
//       return { username: conversation.username2 }
//     } else {
//       return { username: conversation.username1 }
//     }
//   });

    return this.data.map(conversation => (conversation.username1 === this.username ? conversation.username2 : conversation.username1))
  }
}

controller.run();