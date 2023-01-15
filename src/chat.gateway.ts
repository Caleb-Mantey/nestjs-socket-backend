import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const options = {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
@WebSocketGateway(options)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;
  handleDisconnect(client: Socket) {
    Logger.log('Socket Disconnected');
    Logger.log(client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    Logger.log('Socket Connected');
    Logger.log(client.id);
  }

  afterInit(server: any) {
    Logger.log('Socket Initiated');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): any {
    // return 'Hello world!';
    Logger.log(payload);
    this.wss.emit('message', payload);

    // return { event: 'new_message', data: '' };
  }
}
