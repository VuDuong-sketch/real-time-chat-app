import { ChatUserRole } from 'src/enum/chat-user-role.enum';
import { MessageResponseDto } from './message-response.dto';
import { Message } from '../chat.schema';
import { ChatResponseUserRole } from 'src/enum/chat-response-user-role.enum';
import { UserDocument } from 'src/auth/user.schema';

export class ChatResponseDto {
  otherPartyId: string;
  otherPartyUsername: string;
  messages: MessageResponseDto[];
  latestMessage: MessageResponseDto | undefined;
  read: boolean;

  constructor(
    selfRole: ChatUserRole,
    messages: Message[],
    otherParty: UserDocument,
  ) {
    this.messages = messages.map((message) => {
      if (message.sender === selfRole) {
        return new MessageResponseDto(
          ChatResponseUserRole.SELF,
          message.content,
        );
      } else {
        return new MessageResponseDto(
          ChatResponseUserRole.OTHER_PARTY,
          message.content,
        );
      }
    });

    this.latestMessage = this.messages.at(-1);

    this.read = true;

    this.otherPartyId = otherParty.id;
    this.otherPartyUsername = otherParty.username;
  }
}
