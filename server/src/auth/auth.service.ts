import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    username: string,
    password: string,
  ): Promise<{ message: string }> {
    if (await this.userModel.findOne({ username })) {
      throw new ConflictException('Tên người dùng đã tồn tại');
    } else {
      await this.userModel.create({
        username,
        password,
      });

      return {
        message: 'Đăng ký thành công',
      };
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<{
    message: string;
    accessToken: string;
  }> {
    const user = await this.userModel.findOne({ username });

    if (user && user.password === password) {
      return {
        message: 'Đăng nhập thành công',
        accessToken: this.jwtService.sign({
          id: user.id,
          username: user.username,
        }),
      };
    } else {
      throw new UnauthorizedException('Sai tên đăng nhập hoặc mật khẩu');
    }
  }
}
