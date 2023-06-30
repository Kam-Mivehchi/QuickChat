"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const routes_1 = __importDefault(require("./routes"));
// import { connect } from 'mongoose';
const connection_1 = __importDefault(require("./config/connection"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    //connected to correct id
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });
    socket.on("join-chat", (room) => {
        socket.join(room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));
    socket.on("new-message", (newMessageReceived) => {
        let chat = newMessageReceived.chatroom;
        let members = chat.members;
        let sender = newMessageReceived.sender;
        if (!members.length)
            return console.log(`chat.users not defined`);
        members.forEach((user) => {
            if (user._id === sender._id)
                return;
            socket.in(user._id).emit("message-received", newMessageReceived);
        });
    });
    socket.off("setup", (userData) => {
        socket.leave(userData._id);
    });
});
connection_1.default.once('open', () => {
    try {
        console.log(`Database connected`);
        httpServer.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
        });
    }
    catch (e) {
        console.error(`Database connection unsuccessful`, e);
    }
});
