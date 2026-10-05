import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ChatUserRole } from 'src/enum/chat-user-role.enum';

export type ChatDocument = HydratedDocument<Chat>;

export interface Message {
  sender: ChatUserRole;
  content: string;
  timestamp: number;
}

@Schema({ collection: 'chats' })
export class Chat {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user1: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user2: mongoose.Types.ObjectId;

  @Prop({ required: true })
  messages: Message[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
