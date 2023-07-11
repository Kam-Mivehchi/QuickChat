// const express = require('express');
import express, { Express } from "express"
import { createServer } from "http";
import { Server } from "socket.io";
import routes from './routes';
import path from "path"

import db from './config/connection'
import cors from "cors";
import 'dotenv/config'
import { IChatroom, IUser, IMessage } from "./models";
import { instrument } from "@socket.io/admin-ui"
import { ObjectId } from 'mongoose'
const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// app.use(routes)
// if (process.env.NODE_ENV === 'production') {
//    app.use(express.static(path.join(__dirname, '../client/build')));
// }
const httpServer = createServer(app);
// if we're in production, serve client/build as static assets

const io = new Server(httpServer, {
   pingTimeout: 60000,
   cors: {
      origin: "*",
   },
});
instrument(io, {
   auth: false,
   mode: "development",
});
io.on("connection", (socket) => {
   //connected to correct id
   socket.on("setup", (userData: IUser) => {
      socket.join(userData._id as unknown as string);

      socket.emit("connected");
   });

   socket.on("join-chat", (room: string) => {
      socket.join(room);
   });

   socket.on("typing", (room: string) => socket.in(room).emit("typing"));
   socket.on("stop-typing", (room: string) => socket.in(room).emit("stop-typing"));

   socket.on("new-message", (newMessageReceived: IMessage) => {

      let chat = newMessageReceived.chatroom as IChatroom;
      let members = chat.members as ObjectId[];
      let sender = newMessageReceived.sender as unknown as IUser;
      if (!members.length) return console.log(`chat.users not defined`);

      members.forEach((user) => {
         if (user === sender._id) return;

         socket.in(user as unknown as string).emit("message-received", newMessageReceived);
      });
   });

   socket.off("setup", (userData) => {
      socket.leave(userData._id);
   });
});

db.once('open', () => {
   try {

      console.log(`Database connected`);

      httpServer.listen(PORT, () => {
         console.log(`API server running on port ${PORT}!`);
      });
   } catch (e) {
      console.error(`Database connection unsuccessful`, e);

   }
});




