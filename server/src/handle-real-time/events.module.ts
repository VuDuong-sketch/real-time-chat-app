import { Module } from '@nestjs/common';
import { EventsGateway } from './event.gateway';
import { IdentifyingGuard } from './identify.guard';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationService } from './notify.service';

@Module({
  imports: [AuthModule],
  providers: [EventsGateway, IdentifyingGuard, NotificationService],
  exports: [NotificationService],
})
export class EventsModule {}
