import {
  APP_MODE,
  CLIENT_URI,
  DEV_CLIENT_URI,
  SERVER_PORT,
  SERVER_URI,
} from "./config.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import authRoutes from "./routes/authRoutes.js";

const app = express(); // Create new App
const appServer = createServer(app); // Create server from express-app

// Admin-UI Dashboard Directory As Static Path
app.use(express.static("./node_modules/@socket.io/admin-ui/ui/dist"));

// Create new SocketServer
const io = new Server(appServer, {
  cors: {
    origin: [CLIENT_URI, DEV_CLIENT_URI],
    credentials: true,
  },
});

// Configure Admin Dashboard from Socket.IO
instrument(io, {
  auth: {
    type: "basic",
    username: process.env.SOCKETIO_ADMINUI_USERNAME || "admin",
    password:
      process.env.SOCKETIO_ADMINUI_PASSWORD ||
      "$2b$10$z3nsaRuwO59wCz5OM6nwV.nPh9TeixIAhs0wt0SkcV8wqVA/NAhYq", // Default Password = admin@varta
  },
  mode: APP_MODE as "development" | "production" | undefined,
});

// Add API Endpoints
app.use("/api/auth/", authRoutes); // App Authentication Related Routes

// Listen To The Events of The Socket
io.on("connection", (socket) => {
  console.log(`New Client Connected with connection ID = "${socket.id}".`);

  socket?.on("send-message", (msg) => {
    socket.emit("receive-message", msg);
  });

  socket?.on("send-to-message", (msg, to) => {
    socket.to(to).emit("receive-message", msg);
  });
});

appServer.listen(SERVER_PORT, () => {
  console.log(`server is listening on: ${SERVER_URI}`);
}); // Start The App Server
