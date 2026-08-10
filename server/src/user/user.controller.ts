import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import type { Request } from 'express';

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
    @Body() body: { otherPartyId: string; content: string },
  ): Promise<void> {
    await this.userService.send(user.id, body.otherPartyId, body.content);
  }

  @Post('search')
  search(
    @Body() body: { otherPartyUsername: string },
  ): Promise<{ otherPartyId: string }> {
    return this.userService.search(body.otherPartyUsername);
  }

  @HttpCode(HttpStatus.OK)
  @Post('read')
  async read(
    @Req() { user }: Request,
    @Body() body: { otherPartyId: string },
  ): Promise<void> {
    await this.userService.read(user.id, body.otherPartyId);
  }
}
