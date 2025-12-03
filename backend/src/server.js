import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { config } from './config/env.js';
import { setupSocket } from './sockets/transactionSocket.js';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', credentials: true }
});

setupSocket(io);
app.set('io', io);

server.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});
