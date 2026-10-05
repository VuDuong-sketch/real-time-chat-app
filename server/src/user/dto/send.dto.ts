import { IsNotEmpty, IsString } from 'class-validator';

export class SendDto {
  @IsString()
  otherPartyId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
