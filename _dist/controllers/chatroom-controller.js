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
exports.getChatById = exports.deleteChat = exports.removeMemberFromChat = exports.addMemberToChat = exports.createChat = exports.getSingleChat = void 0;
const chatroom_1 = __importDefault(require("../models/chatroom"));
// get single room
function getSingleChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { users } = req.body;
            // const { chatId } = req.params;
            console.log(users);
            if (!users.length) {
                return res.send("No User Provided!");
            }
            let chat = yield chatroom_1.default.find({
                $and: [
                    { members: { $elemMatch: { $eq: req.user._id } } },
                    { members: { $elemMatch: { $eq: users } } },
                ],
            })
                .populate("members", "-password")
                .populate("lastMessage");
            console.log(chat);
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
//create new room
function createChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //users should be entered as an array of ids
            const { users } = req.body;
            // should be a fallback for getSingleChat
            const createChat = yield chatroom_1.default.create({
                chatName: "Direct Message",
                members: [req.user._id, ...users],
                admin: req.user._id
            });
            const fullChat = yield chatroom_1.default.findOne({ _id: createChat._id }).populate("members", "-password").select("-__v");
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
            //users should be entered as an array of ids
            const { users } = req.body;
            const { chatId } = req.params;
            const addUser = yield chatroom_1.default.findByIdAndUpdate(chatId, {
                $addToSet: { members: { $each: users } },
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
            //users should be entered as an array of ids
            const { users } = req.body;
            const { chatId } = req.params;
            const addUser = yield chatroom_1.default.findByIdAndUpdate(chatId, {
                $pullAll: { members: users },
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
exports.removeMemberFromChat = removeMemberFromChat;
//remove members
function deleteChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const toDelete = yield chatroom_1.default.findOne({ _id: req.params.chatId });
            if (req.user._id.toString() !== (toDelete === null || toDelete === void 0 ? void 0 : toDelete.admin.toString())) {
                return res.status(401).json({ message: 'Only the admin can delete this chat' });
            }
            yield chatroom_1.default.findOneAndDelete({ _id: req.params.chatId });
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
            const chat = yield chatroom_1.default.findOne({ _id: req.params.chatId })
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
