import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateRegisterFormDto } from './dto/create-register-form.dto';
import { CreateLoginFormDto } from './dto/create-login-form.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  register(
    @Body(new ValidationPipe()) createRegisterFromDto: CreateRegisterFormDto,
  ): Promise<{ message: string }> {
    return this.authService.register(
      createRegisterFromDto.username,
      createRegisterFromDto.password,
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(
    @Body(new ValidationPipe()) createLoginFormDto: CreateLoginFormDto,
  ): Promise<{
    message: string;
    accessToken: string;
  }> {
    return this.authService.login(
      createLoginFormDto.username,
      createLoginFormDto.password,
    );
  }
}
