"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserChats = exports.deleteUser = exports.updatePassword = exports.updateUser = exports.getMe = exports.searchUsers = exports.login = exports.register = void 0;
const models_1 = require("../models");
const auth_1 = require("../utils/auth");
//create an account and token
function register(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.create(req.body);
            const { _id, username, email } = user;
            if (!user) {
                return res.status(400).json({ message: 'Something is wrong!' });
            }
            const token = (0, auth_1.generateToken)({ _id, username, email });
            res.json({ token, user });
            // res.json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.register = register;
//login
function login({ body }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield models_1.User.findOne({ $or: [{ username: body.username }, { email: body.email }] }).select('-__v');
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }
        const { _id, username, email } = user;
        const correctPw = yield user.isCorrectPassword(body.password);
        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong password!' });
        }
        const token = (0, auth_1.generateToken)({ _id, username, email });
        res.json({ token, user });
    });
}
exports.login = login;
// search for Users
function searchUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { input } = req.body;
            const matchingUsers = yield models_1.User.find({
                username: { $regex: input, $options: "i" },
            }).select("username avatar _id email bio");
            res.json(matchingUsers);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.searchUsers = searchUsers;
// get single user by id
function getMe(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ _id: req.params.userId })
                .select('-__v');
            if (!user) {
                return res.status(400).json({ message: 'Cannot find a user with this id!' });
            }
            res.json(user);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.getMe = getMe;
// update a user not their password
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //do not allow psw change on this route
        if (req.body.hasOwnProperty('password')) {
            return res.status(404).json({ message: 'Cannot updated password with this route, Use /api/users/:id/recovery' });
        }
        try {
            const updatedUser = yield models_1.User.findOneAndUpdate({ _id: req.params.userId }, {
                $set: req.body,
            }, {
                runValidators: true,
                new: true,
            }).select('-__v');
            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(updatedUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.updateUser = updateUser;
function updatePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ _id: req.params.userId }).select('-__v');
            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            user.password = req.body.password;
            yield user.save();
            const { _id, username, email, bio, avatar } = user;
            res.json({ _id, username, email, bio, avatar });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.updatePassword = updatePassword;
// delete user 
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield models_1.User.findOneAndDelete({ _id: req.params.userId });
            res.json({ message: 'User and associated thoughts deleted!' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteUser = deleteUser;
//get all chatrooms for a single user
function getUserChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //
        try {
            const allChats = yield models_1.Chatroom.find({ members: { $elemMatch: { $eq: req.user._id } } })
                .populate("members", "-password")
                .populate("admin", "-password")
                .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    model: "User"
                }
            })
                .sort({ updatedAt: -1 });
            res.json(allChats);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.getUserChats = getUserChats;
