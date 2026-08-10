import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './chat.schema';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { ChatEnum } from 'src/enum/chat.enum';
import { NotificationService } from 'src/handle-real-time/notify.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
    private readonly notificationService: NotificationService,
  ) {}

  async getChats(id: string): Promise<object[]> {
    const chats = (await this.userModel.findById(id))?.chats;

    const chatsForFrontend: {
      messages: {
        sender: string;
        content: string;
      }[];
      otherPartyUsername: string;
      otherPartyId: string;
      latestMessage: {
        sender: string;
        content: string;
      };
      read: boolean;
    }[] = [];

    if (chats) {
      for (let i = 0; i < chats.length; i++) {
        const chatRef = chats[i];

        const chat = await this.chatModel.findById(chatRef.chatId);

        if (!chat) throw new UnauthorizedException();

        const latestMessage = chat.messages[chat.messages.length - 1]; // đây là tin nhắn phía server

        const messagesForFrontend = chat.messages.map((message) => ({
          ...message,
          sender:
            message.sender === chatRef.role
              ? ChatEnum.SELF
              : ChatEnum.OTHER_PARTY,
        }));

        const latestMessageForFrontend = {
          ...latestMessage,
          sender:
            latestMessage.sender === chatRef.role
              ? ChatEnum.SELF
              : ChatEnum.OTHER_PARTY,
        };

        chatsForFrontend.push({
          messages: messagesForFrontend,
          otherPartyUsername: chatRef.otherPartyUsername,
          otherPartyId: chatRef.otherPartyId,
          latestMessage: latestMessageForFrontend,
          read: chatRef.read,
        });
      }

      return chatsForFrontend;
    } else {
      throw new UnauthorizedException();
    }
  }

  async send(
    selfId: string,
    otherPartyId: string,
    content: string,
  ): Promise<void> {
    // Add vào đoạn chat
    await this.addToChat(selfId, otherPartyId, content);

    // Đẩy đoạn chat đó lên đầu của các user
    await this.moveChatToTop(selfId, otherPartyId);

    // Thông báo realtime cho đối phương biết
    this.notificationService.notify(otherPartyId);
  }

  async search(username: string): Promise<{ otherPartyId: string }> {
    const otherPartyId = (await this.userModel.findOne({ username }))?.id;

    if (otherPartyId) {
      return { otherPartyId };
    } else {
      throw new NotFoundException('Tên người dùng không tồn tại');
    }
  }

  async read(selfId: string, otherPartyId: string): Promise<void> {
    const self = await this.userModel.findById(selfId);

    if (!self) throw new UnauthorizedException();

    const chat = self.chats.find((chat) => chat.otherPartyId === otherPartyId);

    if (!chat) throw new UnauthorizedException();

    if (chat.read) return;
    else {
      chat.read = true;
      await this.userModel.findByIdAndUpdate(selfId, self);
    }
  }

  private async addToChat(
    selfId: string,
    otherPartyId: string,
    content: string,
  ) {
    const self = await this.userModel.findById(selfId);
    const otherParty = await this.userModel.findById(otherPartyId);

    if (!self || !otherParty) throw new UnauthorizedException();

    const chatRef = self.chats.find(
      (chat) => chat.otherPartyId === otherPartyId,
    );

    let chatId: string;

    // Nếu 2 ng chưa từng trò chuyện
    if (!chatRef) {
      const chat = await this.chatModel.create({ messages: [] });
      chatId = chat.id;

      // Tạo chat ref ở cả 2 người với chatId
      await this.createChat(selfId, otherPartyId, chatId);
    } else {
      chatId = chatRef.chatId;
    }

    const chat = await this.chatModel.findById(chatId);

    if (!chat) throw new UnauthorizedException();

    const message = {
      sender: chatRef ? chatRef.role : ChatEnum.USER1,
      content,
    };

    chat.messages.push(message);

    await this.chatModel.findByIdAndUpdate(chatId, chat);
  }

  private async createChat(
    selfId: string,
    otherPartyId: string,
    chatId: string,
  ) {
    const self = await this.userModel.findById(selfId);
    const otherParty = await this.userModel.findById(otherPartyId);

    if (!self || !otherParty) throw new UnauthorizedException();

    self.chats.unshift({
      chatId,
      otherPartyId,
      otherPartyUsername: otherParty?.username,
      role: ChatEnum.USER1,
      read: true,
    });

    otherParty.chats.unshift({
      chatId,
      otherPartyId: self.id,
      otherPartyUsername: self.username,
      role: ChatEnum.USER2,
      read: true,
    });

    await this.userModel.findByIdAndUpdate(selfId, self);
    await this.userModel.findByIdAndUpdate(otherPartyId, otherParty);
  }

  private async moveChatToTop(
    selfId: string,
    otherPartyId: string,
  ): Promise<void> {
    const self = await this.userModel.findById(selfId);
    const otherParty = await this.userModel.findById(otherPartyId);

    if (!self || !otherParty) throw new UnauthorizedException();

    const chatId = self.chats.find(
      (chat) => chat.otherPartyId === otherPartyId,
    )?.chatId;

    if (!chatId) {
      throw new UnauthorizedException();
    }

    // Đẩy đoạn chat đó lên đầu của user
    const selfChats = self.chats;
    const otherPartyChats = otherParty.chats;

    for (
      let i = selfChats.findIndex((item) => item.chatId === chatId);
      i > 0;
      i--
    ) {
      // swap i and i - 1
      const tmp = selfChats[i];
      selfChats[i] = selfChats[i - 1];
      selfChats[i - 1] = tmp;
    }

    for (
      let i = otherPartyChats.findIndex((item) => item.chatId === chatId);
      i > 0;
      i--
    ) {
      // swap i and i - 1
      const tmp = otherPartyChats[i];
      otherPartyChats[i] = otherPartyChats[i - 1];
      otherPartyChats[i - 1] = tmp;
    }

    // đánh dấu là chưa đọc
    otherPartyChats.forEach((chatRef) => {
      if (chatRef.chatId === chatId) {
        chatRef.read = false;
      }
    });

    await this.userModel.findByIdAndUpdate(selfId, self);
    await this.userModel.findByIdAndUpdate(otherPartyId, otherParty);
  }
}
