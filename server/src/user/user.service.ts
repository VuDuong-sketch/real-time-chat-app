import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/user.schema';
import { NotificationService } from 'src/handle-real-time/notify.service';
import { ChatResponseDto } from './dto/chat-response.dto';
import { ChatUserRole } from 'src/enum/chat-user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Chat.name)
    private readonly chatModel: Model<Chat>,
    private readonly notificationService: NotificationService,
  ) {}

  async getChats(userId: string): Promise<ChatResponseDto[]> {
    const chats = [
      ...(await this.chatModel.find({ user1: userId }).populate<{
        user1: UserDocument;
        user2: UserDocument;
      }>(['user1', 'user2'])),
      ...(await this.chatModel.find({ user2: userId }).populate<{
        user1: UserDocument;
        user2: UserDocument;
      }>(['user1', 'user2'])),
    ];

    chats.sort((a, b) => {
      const latestMessageTimestampA = a.messages.at(-1)?.timestamp;
      const latestMessageTimestampB = b.messages.at(-1)?.timestamp;

      if (
        latestMessageTimestampA === undefined ||
        latestMessageTimestampB === undefined
      )
        return 1;

      return latestMessageTimestampB - latestMessageTimestampA;
    });

    const chatsForFrontend = chats.map((chat) => {
      const otherParty = chat.user1.id === userId ? chat.user2 : chat.user1;
      const userRole =
        chat.user1.id === userId ? ChatUserRole.USER1 : ChatUserRole.USER2;

      return new ChatResponseDto(userRole, chat.messages, otherParty);
    });

    return chatsForFrontend;
  }

  async send(
    selfId: string,
    otherPartyId: string,
    content: string,
  ): Promise<void> {
    // Add vào đoạn chat
    await this.addToChat(selfId, otherPartyId, content);

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

  read(selfId: string, otherPartyId: string): void {
    console.log(selfId, otherPartyId);
  }

  private async addToChat(
    selfId: string,
    otherPartyId: string,
    content: string,
  ) {
    let chat: ChatDocument | null;

    chat = await this.chatModel.findOne({ user1: selfId, user2: otherPartyId });

    if (!chat)
      chat = await this.chatModel.findOne({
        user1: otherPartyId,
        user2: selfId,
      });

    if (!chat)
      chat = await this.chatModel.create({
        user1: selfId,
        user2: otherPartyId,
        messages: [],
      });

    await chat.updateOne({
      $push: {
        messages: {
          sender:
            chat.user1.toString() === selfId
              ? ChatUserRole.USER1
              : ChatUserRole.USER2,
          content,
          timestamp: Date.now(),
        },
      },
    });
  }
}
