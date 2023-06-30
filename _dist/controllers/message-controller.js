"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMessages = exports.sendMessage = void 0;
const chatroom_1 = __importDefault(require("../models/chatroom"));
const message_1 = __importDefault(require("../models/message"));
function sendMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content } = req.body;
        const { chatId } = req.params;
        if (!content || !chatId) {
            res.status(500).json({ message: "Bad Request: missing message or chatId" });
            return;
        }
        let newMessage = {
            sender: req.user._id,
            content: content,
            chatroom: chatId,
        };
        let message = yield message_1.default.create(newMessage);
        message = yield message.populate("sender", "username avatar");
        message = yield message.populate("chatroom");
        yield chatroom_1.default.findByIdAndUpdate(chatId, { lastMessage: message }, { new: true });
        res.json(message);
    });
}
exports.sendMessage = sendMessage;
;
function allMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { chatId } = req.params;
            console.log(chatId);
            const getMessage = yield message_1.default.find({ chatroom: chatId })
                .populate("sender", "username avatar email _id")
                .populate("chatroom").select("-__v");
            res.json(getMessage);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.allMessages = allMessages;
;
