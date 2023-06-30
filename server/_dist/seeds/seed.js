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
const connection_1 = __importDefault(require("../config/connection"));
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userData_json_1 = __importDefault(require("./userData.json"));
const messageData_json_1 = __importDefault(require("./messageData.json"));
const max_messages_per_chat = 5;
//hash user passwords
const hashedUserDataPromise = userData_json_1.default.map((user) => __awaiter(void 0, void 0, void 0, function* () {
    let hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
    user.password = hashedPassword;
    return user;
}));
connection_1.default.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    // clean database
    console.log("User");
    yield models_1.User.deleteMany({});
    yield models_1.Chatroom.deleteMany({});
    yield models_1.Message.deleteMany({});
    // execute hash promise
    const hashedUserData = yield Promise.all(hashedUserDataPromise);
    // bulk create each model
    const users = yield models_1.User.insertMany(hashedUserData);
    const createdChats = [];
    //create chat between users
    for (let user of users) {
        //randomly find members that are't the current user
        const otherUsers = users.filter(person => person._id !== user._id);
        const randomIndex = Math.floor(Math.random() * otherUsers.length);
        const createDM = yield models_1.Chatroom.create({
            roomName: "Direct Message",
            members: [user._id, otherUsers[randomIndex]._id],
            admin: user._id
        });
        const otherUsers2 = users.filter(person => person._id !== user._id || person._id !== otherUsers[randomIndex]._id);
        const randomIndex2 = Math.floor(Math.random() * otherUsers2.length);
        const createGroupChat = yield models_1.Chatroom.create({
            roomName: "Group Message",
            members: [user._id, otherUsers[randomIndex]._id, otherUsers2[randomIndex2]._id],
            admin: user._id
        });
        createdChats.push(createDM);
        createdChats.push(createGroupChat);
    }
    //add messages to each chat
    for (let chat of createdChats) {
        for (let i = 0; i < Math.random() * max_messages_per_chat; i++) {
            yield models_1.Message.create({
                sender: chat.members[Math.floor(Math.random() * chat.members.length)],
                content: messageData_json_1.default[Math.floor(Math.random() * messageData_json_1.default.length)].content,
                chatroom: chat._id,
            });
        }
    }
    //create group chats
    // const chatrooms = await Chatroom.insertMany(chatroomData);
    // const messages = await Message.insertMany(MessageData);
    // for (chat of chatrooms) {
    //    // randomly add each Chatroom to a User
    //    const tempUser = users[Math.floor(Math.random() * users.length)];
    //    tempUser.chatrooms.push(chat._id);
    //    await tempUser.save();
    //    // randomly add a Message to each Chatroom
    //    const tempMessage = messages[Math.floor(Math.random() * messages.length)];
    //    chat.message = tempMessage._id;
    //    await chat.save();
    //    // reference Chatroom on Message model, too
    //    tempMessage.chatrooms.push(chat._id);
    //    await tempMessage.save();
    // }
    console.log('all done!');
    process.exit(0);
}));
