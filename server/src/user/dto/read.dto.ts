import { IsString } from 'class-validator';

export class ReadDto {
  @IsString()
  otherPartyId: string;
}
