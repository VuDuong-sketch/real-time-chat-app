import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserService } from './user.service';
import { EventsModule } from 'src/handle-real-time/events.module';

@Module({
  imports: [AuthModule, EventsModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
