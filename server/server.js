import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { controller } from './control.js';

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User connected");

  let queue = null;

  socket.on("login", data => {
    if (controller.handleLogin(data.username, data.password)) {
      queue = controller.createQueue(socket, data.username);
      socket.emit("login", controller.getConversations(data.username));
    } else {
      socket.emit("login", false);
    }
  });

  socket.on("chat", msg => {
    console.log(msg);
    queue.push({
      eventName: "chat",
      ...msg
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Socket.IO Server Running");
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log("Server started");
});