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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../utils/auth");
// get all users
function getUsers(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allUsers = yield user_1.default.find()
                .select('-__v');
            res.json(allUsers);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.getUsers = getUsers;
// get single user by id
function getSingleUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.default.findOne({ _id: req.params.id })
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
exports.getSingleUser = getSingleUser;
// create a new user
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield user_1.default.create(req.body);
            const { _id, username, email } = newUser;
            if (!newUser) {
                return res.status(400).json({ message: 'Something is wrong!' });
            }
            const token = (0, auth_1.generateToken)({ _id, username, email });
            res.json({ token, newUser });
            // res.json(newUser);
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.createUser = createUser;
// update a user
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield user_1.default.findOneAndUpdate({ _id: req.params.id }, {
                $set: req.body,
            }, {
                runValidators: true,
                new: true,
            });
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
// delete user 
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield user_1.default.findOneAndDelete({ _id: req.params.id });
            res.json({ message: 'User and associated thoughts deleted!' });
        }
        catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    });
}
exports.deleteUser = deleteUser;
function login({ body }, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ $or: [{ username: body.username }, { email: body.email }] });
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
