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
Object.defineProperty(exports, "__esModule", { value: true });
exports.allMessages = exports.sendMessage = exports.getChatById = exports.deleteChat = exports.removeMemberFromChat = exports.addMemberToChat = exports.createChat = exports.getSingleChat = void 0;
const models_1 = require("../models");
// get single room only for dm
function getSingleChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { members } = req.body;
            // const { chatId } = req.params;
            if (!members.length) {
                return res.send("No User Provided!");
            }
            let chat = yield models_1.Chatroom.find({
                $and: [
                    { members: { $elemMatch: { $eq: req.user._id } } },
                    { members: { $elemMatch: { $eq: members } } },
                ],
            })
                .populate("members", "-password")
                .populate("lastMessage");
            if (!chat.length) {
                return createChat(req, res);
            }
            res.json(chat[0]);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.getSingleChat = getSingleChat;
//create new group chat
function createChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //members should be entered as an array of ids
            const { members } = req.body;
            // should be a fallback for getSingleChat
            const createChat = yield models_1.Chatroom.create({
                chatName: "Direct Message",
                members: [req.user._id, ...members],
                admin: req.user._id
            });
            const fullChat = yield models_1.Chatroom.findOne({ _id: createChat._id }).populate("members", "-password").select("-__v");
            res.json(fullChat);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.createChat = createChat;
//add members
function addMemberToChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //members should be entered as an array of ids
            const { members } = req.body;
            const { chatId } = req.params;
            const addUser = yield models_1.Chatroom.findByIdAndUpdate(chatId, {
                $addToSet: { members: { $each: members } },
            }, {
                new: true,
            })
                .populate("members", "-password")
                .populate("admin", "-password")
                .select("-__v");
            res.json(addUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.addMemberToChat = addMemberToChat;
//remove members
function removeMemberFromChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //members should be entered as an array of ids
            const { members } = req.body;
            const { chatId } = req.params;
            const removeMember = yield models_1.Chatroom.findByIdAndUpdate(chatId, {
                $pullAll: { members: members },
            }, {
                new: true,
            })
                .populate("members", "-password")
                .populate("admin", "-password")
                .select("-__v");
            res.json(removeMember);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.removeMemberFromChat = removeMemberFromChat;
//remove members
function deleteChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const toDelete = yield models_1.Chatroom.findOne({ _id: req.params.chatId });
            if (req.user._id.toString() !== (toDelete === null || toDelete === void 0 ? void 0 : toDelete.admin.toString())) {
                return res.status(402).json({ message: 'Only the admin can delete this chat' });
            }
            yield models_1.Chatroom.findOneAndDelete({ _id: req.params.chatId });
            res.json({ message: 'Chat has been deleted!' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteChat = deleteChat;
function getChatById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chat = yield models_1.Chatroom.findOne({ _id: req.params.chatId })
                .populate("members", "-password")
                .populate("lastMessage")
                .select("-__v");
            res.json(chat);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.getChatById = getChatById;
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
        let message = yield models_1.Message.create(newMessage);
        message = yield message.populate("sender", "username avatar");
        message = yield message.populate("chatroom");
        yield models_1.Chatroom.findByIdAndUpdate(chatId, { lastMessage: message }, { new: true });
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
            const getMessage = yield models_1.Message.find({ chatroom: chatId })
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
