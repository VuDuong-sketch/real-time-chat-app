import fs from 'fs'

import users from './user.json' with { type: 'json' };
import conversations from './conversation.json' with { type: 'json' };

export const databaseManager = {
  login(username, password) {
    for (const user of users) {
      if (user.username === username && user.password === password) {
        return true;
      }
    }
    return false;
  },
  
  register(username, password) {
    if (this.hasUser(username)) {
      return false;
    } else {
      users.push({
        username: username,
        password: password
      });
      fs.writeFile('./database/user.json', JSON.stringify(users, null, 2), err => {});
      return true;
    }
  },
  
  hasUser(username) {
    for (const user of users) {
      if (user.username === username) {
        return true;
      }
    }
    return false;
  },

  getConversation(username1, username2) {
    for (const conversation of conversations) {
      if ((conversation.username1 === username1 && conversation.username2 === username2) || (conversation.username1 === username2 && conversation.username2 === username1)) {
        return conversation.messages;
      }
    }
    return null;
  },

  async sendMessage(username1, username2, message) {
    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      if ((conversation.username1 === username1 && conversation.username2 === username2) || (conversation.username1 === username2 && conversation.username2 === username1)) {
        conversations[i]["messages"].push(message);
        await fs.writeFile('./database/conversation.json', JSON.stringify(conversations, null, 2), err => {});
        return;
      }
    }
    this.addConversation(username1, username2, message);
  },

  async addConversation(username1, username2, firstMessage) {
    conversations.push({
      username1: username1,
      username2: username2,
      messages: [firstMessage]
    });
    await fs.writeFile('./database/conversation.json', JSON.stringify(conversations, null, 2), 'utf-8', err => {});
  },

  getConversations(username) {

    const cacDoanChat = [];

    for (const conversation of conversations) {
      if (conversation.username1 === username || conversation.username2 === username) {
        cacDoanChat.push(conversation);
      }
    }
    return cacDoanChat;
  }
}