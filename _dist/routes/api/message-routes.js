"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const message_controller_1 = require("../../controllers/message-controller");
const router = (0, express_1.Router)();
router.route('/').post(message_controller_1.sendMessage);
router.route('/:chatId').get(message_controller_1.allMessages);
exports.default = router;
