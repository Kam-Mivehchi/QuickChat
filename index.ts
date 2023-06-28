// const express = require('express');
import express, { Express } from "express"
import { createServer } from "http";
import { Server } from "socket.io";
import routes from './routes';
// import { connect } from 'mongoose';
import db from './config/connection'
import cors from "cors";
import 'dotenv/config'


const PORT = process.env.PORT || 3001;
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use(routes)
const httpServer = createServer(app);


const io = new Server(httpServer, {
   pingTimeout: 60000,
   cors: {
      origin: "*",
   },
});

io.on("connection", (socket) => {
   // ...
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




