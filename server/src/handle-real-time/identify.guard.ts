import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'dgram';
import { NotificationService } from './notify.service';

@Injectable()
export class IdentifyingGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly notificationService: NotificationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToWs().getData<{ accessToken: string }>();
    const socket = context.switchToWs().getClient<Socket>();

    const token = data.accessToken;
    if (!token) {
      throw new UnauthorizedException('Missing or invalid token');
    }
    try {
      // 💡 Here the JWT secret key that's used for verifying the payload
      // is the key that was passed in the JwtModule
      const payload = await this.jwtService.verifyAsync<{
        id: string;
        username: string;
      }>(token);
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      this.notificationService.setSocketIdentity(payload.id, socket);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }
}
