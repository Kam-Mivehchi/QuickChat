"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
    chatroom: {
        type: mongoose_1.Types.ObjectId,
        ref: "Chat",
    },
    content: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
    id: false,
});
exports.default = (0, mongoose_1.model)("Message", messageSchema);
