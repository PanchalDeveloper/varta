import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { APP_MODE, CLIENT_URI, SERVER_PORT, SERVER_URI, DEV_CLIENT_URI } from './Initialize.js';

const app = express(); // Create new App
const appServer = createServer(app); // Create server from express-app

// Admin-UI Dashboard Directory As Static Path
app.use(express.static('./node_modules/@socket.io/admin-ui/ui/dist'));

// Create new SocketServer
const io = new Server(appServer, {
  cors: {
    origin: [CLIENT_URI, DEV_CLIENT_URI],
    credentials: true
  }
});

// Configure Admin Dashboard from Socket.IO
instrument(io, {
  auth: false,
  mode: APP_MODE,
});

// Listen To The Events of The Socket
io.on('connection', socket => {
  console.log(`New Client Connected with connection ID = "${socket.id}".`);

  socket.emit(`Welcome to new Chat on Varta! [SocketID = ${socket.id}]`);
});

appServer.listen(SERVER_PORT, () => {
  console.log(`server is listening on: ${SERVER_URI}`);

}) // Start The App Server
