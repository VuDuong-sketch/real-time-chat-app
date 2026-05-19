import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export const controller = {
  isLoggedIn: false,
  isChatBox: false,
  username: undefined,
  password: undefined,
  data: null,  // mảng các cuộc trò chuyện
  updateMessagesInChatBox: () => {},
  updateMessagesInChatSidebar: () => {},

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

      if (this.isChatBox) {
        this.updateMessagesInChatBox();
        console.log("Hiển thị tin nhắn mới");
      } else {
        this.updateMessagesInChatSidebar(); // hàm này để code sau (hiện tại không có tác dụng gì cả)
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

  getFriends() {
    return this.data.map(conversation => (conversation.username1 === this.username ? conversation.username2 : conversation.username1))
  }
}

controller.run();