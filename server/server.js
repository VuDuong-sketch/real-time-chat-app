import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { SocketListener } from './SocketListener.js';
import { databaseManager } from './database/DatabaseManager.js';

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

const socketListeners = {};

io.on("connection", (socket) => {
  console.log("User connected");

  let socketListener = null;
  let username = null;

  socket.on("login", msg => {
    if (databaseManager.login(msg.username, msg.password)) {

      username = msg.username;
      socketListener = new SocketListener(socket, socketListeners);
      socketListeners[username] = socketListener;
      socket.emit("login", databaseManager.getConversations(username));

    } else {
      socket.emit("login", false);
    }
  });

  socket.on("register", msg => {
    socket.emit("register", databaseManager.register(msg.username, msg.password));
  })

  socket.on("search", name => {
    socket.emit("search", databaseManager.hasUser(name))
  })

  socket.on("chat", message => {
    console.log(message);
    socketListener.handleChatMessageFromSocket(message);
  });

  socket.on("disconnect", () => {

    socketListener = null;
    delete socketListeners[username];
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