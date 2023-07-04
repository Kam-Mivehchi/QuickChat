"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatroom_controller_1 = require("../../controllers/chatroom-controller");
const router = (0, express_1.Router)();
//creates a new chat
router.route('/').post(chatroom_controller_1.createChat);
router.route('/dm').post(chatroom_controller_1.getSingleChat);
//gets chat data or deletes the room entirely as admin
router.route('/:chatId').get(chatroom_controller_1.getChatById).delete(chatroom_controller_1.deleteChat).post(chatroom_controller_1.sendMessage);
router.route('/:chatId/messages').get(chatroom_controller_1.allMessages);
//future
// router.route('/:chatId/members').put(editChatMembers)
//adds members to a chatroom
router.route('/:chatId/add').put(chatroom_controller_1.addMemberToChat);
// handles leaving the chat and removing people as admin
router.route('/:chatId/remove').put(chatroom_controller_1.removeMemberFromChat);
exports.default = router;
