import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`client connected ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`client disconnected ${client.id}`);
  }

  @SubscribeMessage('sendNotification')
  handleSendNotification(@MessageBody() data: any) {
    console.log(data);
    this.server.emit('receiveNotification', data);
  }
}
