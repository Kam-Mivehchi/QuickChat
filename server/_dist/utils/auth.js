"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.authMiddleware = void 0;
// const jwt = require('jsonwebtoken');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
// set token secret and expiration date
const secret = process.env.JWT_SECRET;
const expiration = '2h';
// function for our authenticated routes
function authMiddleware(req, res, next) {
    let token;
    if (req.query.token) {
        token = req.query.token;
    }
    else {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            token = authorizationHeader.split(' ')[1];
        }
    }
    if (!token) {
        res.status(401).json({ message: 'You have no token!' });
        return;
    }
    const secret = process.env.JWT_SECRET;
    // verify token and get user data out of it
    try {
        const data = jsonwebtoken_1.default.verify(token, secret, { maxAge: expiration });
        req.user = data;
        next();
    }
    catch (_a) {
        console.log('Invalid token');
        res.status(400).json({ message: 'invalid token!' });
        return;
    }
    // send to next endpoint
}
exports.authMiddleware = authMiddleware;
function generateToken(userPayload) {
    return jsonwebtoken_1.default.sign(userPayload, secret, { expiresIn: expiration });
}
exports.generateToken = generateToken;
