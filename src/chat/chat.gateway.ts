import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer() io: Server;
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(client);
    console.log(payload);

    this.io.emit('newMessage', payload);
  }
}
