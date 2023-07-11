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
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./config/connection"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const admin_ui_1 = require("@socket.io/admin-ui");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(routes_1.default);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
}
const httpServer = (0, http_1.createServer)(app);
// if we're in production, serve client/build as static assets
const io = new socket_io_1.Server(httpServer, {
    pingTimeout: 60000,
    cors: {
        origin: "*",
    },
});
(0, admin_ui_1.instrument)(io, {
    auth: false,
    mode: "development",
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
            if (user === sender._id)
                return;
            socket.in(user).emit("message-received", newMessageReceived);
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
