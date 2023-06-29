"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user-routes"));
const chatroom_routes_1 = __importDefault(require("./chatroom-routes"));
const auth_1 = require("../../utils/auth");
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.default);
router.use('/chat', auth_1.authMiddleware, chatroom_routes_1.default);
router.use('/messages', auth_1.authMiddleware, chatroom_routes_1.default);
// router.use('/thoughts', thoughtRoutes);
exports.default = router;
