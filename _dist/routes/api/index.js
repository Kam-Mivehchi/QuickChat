"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user-routes"));
// const userRoutes = require('./user-routes');
// const thoughtRoutes = require('./thought-routes');
const router = (0, express_1.Router)();
router.use('/users', user_routes_1.default);
// router.use('/thoughts', thoughtRoutes);
exports.default = router;
