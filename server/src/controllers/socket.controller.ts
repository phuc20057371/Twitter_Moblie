import { Server as SocketServer } from 'socket.io';
import { NotificationType, User } from '../model';
import { createNotification } from './notification.controller';

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

    socket.on('follow', async ({ userName, room, name }) => {
      console.log(`Received follow event from ${name} in room ${room}`);
      console.log('username: ', name);
      const notification = await createNotification(userName, {
        type: NotificationType.Follow,
        message: `vừa theo dõi bạn.`,
        fromUserName: name,
      });
      console.log('create noti', notification);
      io.to(room).emit('follow', { userName, room, name, notification });
    });

    socket.on('like', async ({ room, userName, name, tweetId, data, flag }) => {
      console.log(`Received follow event from ${name} in room ${room}`);
      console.log("flag ",flag)
      if (flag){
        const notification = await createNotification(userName, {
          type: NotificationType.Like,
          message: `vừa thích bài viết của bạn`,
          fromUserName: name,
          tweetId: tweetId,
        });
        io.to(room).emit('like', { userName, room, name, notification, tweetId, data,flag });
      }else {
        io.to(room).emit('like', { userName, room, name, tweetId, data,flag });
      }
    });

    socket.on('comment', async ({ room, userName, name, tweetId, data }) => {
      console.log(`Received follow event from ${name} in room ${room}`);
      console.log('tweetID', tweetId);
      const notification = await createNotification(userName, {
        type: NotificationType.Comment,
        message: `vừa comment bài viết của bạn`,
        fromUserName: name,
        tweetId: tweetId,
      });
      io.to(room).emit('comment', { userName, room, name, notification, tweetId,data });
    });
    socket.on('likecomment', async ({ room, userName, name, tweetId, commentId }) => {
      console.log(`Received follow event from ${name} in room ${room}`);
      console.log('tweetID', tweetId);
      const notification = await createNotification(userName, {
        type: NotificationType.LikeComment,
        message: `${name} liked your comment`,
        fromUserName: name,
        tweetId: tweetId,
      });
      io.to(room).emit('likecomment', { userName, room, name, notification, tweetId, commentId });
    });
    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });
};
