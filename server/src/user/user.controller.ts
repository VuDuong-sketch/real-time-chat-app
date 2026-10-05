import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import type { Request } from 'express';
import { SendDto } from './dto/send.dto';
import { SearchDto } from './dto/search.dto';
import { ReadDto } from './dto/read.dto';

@UseGuards(AuthGuard)
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('chats')
  getChats(@Req() { user }: Request): Promise<object[]> {
    return this.userService.getChats(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('send')
  async send(
    @Req() { user }: Request,
    @Body(new ValidationPipe()) sendDto: SendDto,
  ): Promise<void> {
    await this.userService.send(user.id, sendDto.otherPartyId, sendDto.content);
  }

  @Post('search')
  search(
    @Body(new ValidationPipe()) searchDto: SearchDto,
  ): Promise<{ otherPartyId: string }> {
    return this.userService.search(searchDto.otherPartyUsername);
  }

  @HttpCode(HttpStatus.OK)
  @Post('read')
  read(
    @Req() { user }: Request,
    @Body(new ValidationPipe()) readDto: ReadDto,
  ): void {
    this.userService.read(user.id, readDto.otherPartyId);
  }
}
