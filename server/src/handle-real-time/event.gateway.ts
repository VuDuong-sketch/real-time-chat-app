import { Injectable, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IdentifyingGuard } from './identify.guard';
import { Socket } from 'dgram';
import { NotificationService } from './notify.service';

@WebSocketGateway(80, {
  namespace: 'events',
  cors: {
    origin: 'http://localhost:5173',
  },
})
@Injectable()
export class EventsGateway implements OnGatewayDisconnect, OnGatewayConnection {
  constructor(private readonly notificationService: NotificationService) {}

  handleConnection(client: Socket) {
    client.emit('connection', 'Kết nối thành công, hãy xác thực');
  }

  handleDisconnect(client: Socket): void {
    this.notificationService.delete(client);
  }

  @UseGuards(IdentifyingGuard)
  @SubscribeMessage('auth')
  handleEvent(): void {}
}
