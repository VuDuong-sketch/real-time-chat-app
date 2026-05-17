import { io } from "socket.io-client";
import { AsyncQueue } from "./AsyncQueue";

const socket = io("http://localhost:3001");

export const controller = {
  isLoggedIn: false,
  username: undefined,
  password: undefined,
  queue: new AsyncQueue(),

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
    }

    return msg;
  },

  send(msg) {
    socket.emit("chat", msg);
  },

  async run() {
    socket.on("chat", msg => {
      this.queue.push(msg);
    })
  }
}

controller.run();