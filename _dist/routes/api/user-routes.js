"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getUsers } from '../../controllers/user-controller'
const user_controller_1 = require("../../controllers/user-controller");
const auth_1 = require("../../utils/auth");
const router = (0, express_1.Router)();
router.route('/').get(auth_1.authMiddleware, user_controller_1.getUsers);
//every route should be protected
router.route('/register').post(user_controller_1.register);
router.route('/login').post(user_controller_1.login);
router.route('/chats').get(auth_1.authMiddleware, user_controller_1.getUserChats);
router.route('/:userId').get(auth_1.authMiddleware, user_controller_1.getMe).put(auth_1.authMiddleware, user_controller_1.updateUser).delete(auth_1.authMiddleware, user_controller_1.deleteUser);
router.route('/:userId/recovery').put(auth_1.authMiddleware, user_controller_1.updatePassword);
// console.log(getUsers)
exports.default = router;
