"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatroom_controller_1 = require("../../controllers/chatroom-controller");
const router = (0, express_1.Router)();
//creates a new chat
router.route('/').post(chatroom_controller_1.createChat);
//gets chat data or deletes the room entirely as admin
router.route('/:id').get(chatroom_controller_1.getSingleChat).delete(chatroom_controller_1.deleteChat);
//adds members to a chatroom
router.route('/:id/add').put(chatroom_controller_1.addMemberToChat);
// handles leaving the chat and removing people as admin
router.route('/:id/remove').put(chatroom_controller_1.removeMemberFromChat);
exports.default = router;
