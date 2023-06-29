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
exports.deleteChat = exports.removeMemberFromChat = exports.addMemberToChat = exports.createChat = exports.getSingleChat = void 0;
// get single room
function getSingleChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.getSingleChat = getSingleChat;
//create new room
function createChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // should be a fallback for getSingleChat
    });
}
exports.createChat = createChat;
//add members
function addMemberToChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.addMemberToChat = addMemberToChat;
//remove members
function removeMemberFromChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.removeMemberFromChat = removeMemberFromChat;
//remove members
function deleteChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () { });
}
exports.deleteChat = deleteChat;
