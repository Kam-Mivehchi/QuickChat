"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getUsers } from '../../controllers/user-controller'
const user_controller_1 = require("../../controllers/user-controller");
const auth_1 = require("../../utils/auth");
const router = (0, express_1.Router)();
//every route should be protected
router.route('/register').post(user_controller_1.register);
router.route('/login').post(user_controller_1.login);
router.route('/').get(user_controller_1.getUsers);
router.route('/:id').get(auth_1.authMiddleware, user_controller_1.getMe).put(auth_1.authMiddleware, user_controller_1.updateUser).delete(auth_1.authMiddleware, user_controller_1.deleteUser);
router.route('/:id/chats').put(auth_1.authMiddleware, user_controller_1.getUserChats);
router.route('/:id/recovery').put(auth_1.authMiddleware, user_controller_1.updatePassword);
// console.log(getUsers)
exports.default = router;
