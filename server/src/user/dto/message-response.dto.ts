import { ChatResponseUserRole } from 'src/enum/chat-response-user-role.enum';

export class MessageResponseDto {
  sender: ChatResponseUserRole;
  content: string;

  constructor(sender: ChatResponseUserRole, content: string) {
    this.sender = sender;
    this.content = content;
  }
}
