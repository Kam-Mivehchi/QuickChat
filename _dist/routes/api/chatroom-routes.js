"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chatroom_controller_1 = require("../../controllers/chatroom-controller");
const router = (0, express_1.Router)();
//every route should be protected
// router.route('/register').post(register)
// router.route('/login').post(login);
// router.route('/').get(getUsers)
// router.route('/:id').get(getMe).put(updateUser).delete(deleteUser)
// router.route('/:id/recovery').put(updatePassword)
//creates a new chat
router.route('/').post(chatroom_controller_1.createChat);
//gets chat data or deletes the room entirely as admin
router.route('/:id').get(chatroom_controller_1.getSingleChat).delete(chatroom_controller_1.deleteChat);
//adds members to a chatroom
router.route('/:id/add').post(chatroom_controller_1.addMemberToChat);
// handles leaving the chat and removing people as admin
router.route('/:id/remove').post(chatroom_controller_1.removeMemberFromChat);
// console.log(getUsers)
exports.default = router;
