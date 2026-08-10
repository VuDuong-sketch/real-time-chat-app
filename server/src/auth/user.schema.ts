import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ChatEnum } from 'src/enum/chat.enum';

export interface ChatRef {
  chatId: string;
  otherPartyId: string;
  otherPartyUsername: string;
  role: ChatEnum;
  read: boolean;
}

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  chats: ChatRef[];
}

export const UserSchema = SchemaFactory.createForClass(User);
