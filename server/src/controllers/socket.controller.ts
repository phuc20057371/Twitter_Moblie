import { Server as SocketServer } from 'socket.io';

export const configureSocket = (httpServer: any) => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('joinRoom', ({ room }) => {
      console.log(`Client joined room: ${room}`);
      socket.join(room);
    });

    socket.on('follow', ({ userName, room, name }) => {
      console.log(`Received follow event from ${name} in room ${room}`);
      const count = 1;
      const message = `${name} started follow you`;
      io.to(room).emit('follow', { userName, count, room, message, name });
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
};
