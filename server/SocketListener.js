import { databaseManager } from "./database/DatabaseManager.js";

export class SocketListener {
  constructor(socket, colleagues) {
    this.socket = socket
    this.colleagues = colleagues;
  }

  handleChatMessageFromSocket(message) {
    databaseManager.sendMessage(message.sender, message.receiver, message);
    this.socket.emit("chat", message);
    if (message.receiver in this.colleagues) {
      this.colleagues[message.receiver].handleChatMessageFromColleague(message);
    }
  }

  handleChatMessageFromColleague(message) {
    this.socket.emit("chat", message);
  }
}