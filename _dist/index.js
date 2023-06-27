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
    // ...
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
