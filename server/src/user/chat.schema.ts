import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatEnum } from 'src/enum/chat.enum';

export interface Message {
  sender: ChatEnum;
  content: string;
}

@Schema({ collection: 'chats' })
export class Chat {
  @Prop({ required: true })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
