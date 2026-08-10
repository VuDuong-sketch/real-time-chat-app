import { Injectable } from '@nestjs/common';
import { Socket } from 'dgram';

@Injectable()
export class NotificationService {
  private clients = new Map<string, Socket>();

  setSocketIdentity(id: string, socket: Socket) {
    this.clients.set(id, socket);
  }

  notify(id: string) {
    this.clients.get(id)?.emit('events', 'Bạn có thông báo mới');
  }

  delete(socket: Socket) {
    for (const [key, val] of this.clients.entries()) {
      if (val === socket) this.clients.delete(key);
    }
  }
}
