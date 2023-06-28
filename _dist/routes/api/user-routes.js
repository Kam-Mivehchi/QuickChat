"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getUsers } from '../../controllers/user-controller'
const user_controller_1 = require("../../controllers/user-controller");
const router = (0, express_1.Router)();
//every route should be protected
router.route('/').get(user_controller_1.getUsers);
router.route('/:id').get(user_controller_1.getMe).put(user_controller_1.updateUser);
router.route('/:id/recovery').put(user_controller_1.updatePassword);
router.route('/register').post(user_controller_1.register);
router.route('/login').post(user_controller_1.login);
// console.log(getUsers)
exports.default = router;
