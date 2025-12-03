export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    socket.on('auth:join', (userId) => {
      socket.join(`user:${userId}`);
    });
    socket.on('disconnect', () => {});
  });
};
