import { Injectable } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
@Injectable()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private clients: Map<string, Socket> = new Map(); // Lưu trữ client

  handleConnection(client: Socket) {
    console.log('New user connected..', client.id);
    this.clients.set(client.id, client); // Lưu client vào bản đồ
    client.broadcast.emit('user-joined', {
      message: `New User Joined the socket: ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('User disconnected..', client.id);
    this.clients.delete(client.id); // Xóa client khỏi bản đồ
    this.server.emit('user-left', {
      message: `User left the socket: ${client.id}`,
    });
  }

  // Gửi tin nhắn đến client cụ thể
  sendMessageToClient(clientId: string, message: any) {
    const clientSocket = this.clients.get(clientId);
    if (clientSocket) {
      clientSocket.emit('orderAction', message);
    } else {
      console.log(`Client ${clientId} not connected.`);
    }
  }
}
