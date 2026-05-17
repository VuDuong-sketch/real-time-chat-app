import { AsyncQueue } from "./AsyncQueue.js";
import { databaseManager } from "./database/DatabaseManager.js";

class SocketListener {
  constructor(socket, queue, username, colleagues) {
    this.socket = {
      "socket": socket,
      "queue": queue
    };
    this.user = {
      username: username
    };
    this.colleagues = colleagues;  // message box of socket listeners indexed by user.username
    this.queue = new AsyncQueue(); // để nhận tin nhắn từ đồng nghiệp
    this.isRunning = false;

    this.colleagues[username] = this.queue;
  }

  async run() {
    this.isRunning = true;
    this.workWithSocket();
    this.workWithColleagues();
  }

  async workWithSocket() {
    while (this.isRunning) {
      const packet = await this.listenSocket();

      this.handlePacketFromSocket(packet);
    }
  }

  async workWithColleagues() {
    while (this.isRunning) {
      const packet = await this.listenColleagues();

      this.handlePacketFromColleague(packet);
    }
  }

  handlePacketFromSocket(packet) {
    if (packet.eventName == "disconnect") {
      this.isRunning = false;
    } else if (packet.eventName == "chat") {
      this.handleChatPacketFromSocket(packet);
    }
  }

  handlePacketFromColleague(packet) {
    if (packet.eventName == "chat") {
      this.handleChatPacketFromColleague(packet);
    }
  }

  handleChatPacketFromSocket(packet) {
    this.sendToSocket(packet);
    const {eventName, ...message} = packet
    databaseManager.sendMessage(message.sender, message.receiver, message);
    this.sendToColleague(packet.receiver, packet);
  }

  handleChatPacketFromColleague(packet) {
    this.sendToSocket(packet);
  }

  sendToSocket({eventName, ...packetWithoutEventName}) { // nhận đối số là packet
    this.socket.socket.emit(eventName, packetWithoutEventName);
  }

  sendToColleague(username, packet) {
    this.colleagues[username].push(packet);
  }

  async listenSocket() {
    const packet = await this.socket.queue.pop();
    return packet;
  }

  async listenColleagues() {
    const packet = await this.queue.pop();
    return packet;
  }
}

export const controller = {
  colleagues: {}, // socket indexed by username

  createQueue(socket, username) {
    const queue = new AsyncQueue();
    new SocketListener(socket, queue, username, this.colleagues).run();
    return queue;
  },

  handleLogin(username, password) {
    return databaseManager.login(username, password);
  },

  getConversations(username) {
    const conversations = databaseManager.getConversations(username);
    return conversations;
  }
}