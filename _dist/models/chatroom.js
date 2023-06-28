"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatroomSchema = new mongoose_1.Schema({
    roomName: {
        type: String,
        default: "New Chat",
        trim: true,
    },
    members: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "User",
        },
    ],
    lastMessage: {
        type: mongoose_1.Types.ObjectId,
        ref: "Message",
    },
    admin: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
chatroomSchema.virtual('isGroup').get(function () {
    return this.members.length > 2;
});
exports.default = (0, mongoose_1.model)("Chat", chatroomSchema);
