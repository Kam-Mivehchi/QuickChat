"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = __importStar(require("chai"));
const message_1 = __importDefault(require("../models/message"));
const chai_http_1 = __importDefault(require("chai-http"));
const mongoose_1 = __importDefault(require("mongoose"));
chai_1.default.use(chai_http_1.default);
const request = chai_1.default.request("http://localhost:3001");
describe('Message Routes', () => {
    let test_user;
    let test_chat;
    let token;
    before(() => __awaiter(void 0, void 0, void 0, function* () {
        // Connect to the test database or create a separate test database
        mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app');
        //sign in as john doe
        let response = yield request.post(`/api/users/login`).send({
            username: "john_doe",
            email: "john@example.com",
            password: "asdfasdf"
        });
        console.log(response.body);
        token = response.body.token;
        test_user = response.body.user;
        let response2 = yield request.get(`/api/users/chats`).set("Authorization", "Bearer " + token);
        test_chat = response2.body[0];
        console.log(test_chat);
    }));
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        // Disconnect from the test database
        yield mongoose_1.default.disconnect();
    }));
    describe("/api/chat", () => {
        it('send message to a chat', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post(`/api/chat/${test_chat._id}`).set("Authorization", "Bearer " + token).send({ content: "this is a test" });
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            (0, chai_1.expect)(response.body).to.have.all.keys('_id', "chatroom", "content", "__v", "updatedAt", "createdAt", "sender");
            const message = yield message_1.default.findOne({ _id: response.body._id });
            (0, chai_1.expect)(message).to.be.an('object');
            (0, chai_1.expect)(message.content).to.equal("this is a test");
        }));
        it('get all Messages for a single chat', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/chat/${test_chat._id}/messages`).set("Authorization", "Bearer " + token);
            console.log(response.body[0]);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
            (0, chai_1.expect)(response.body[0]).to.have.all.keys('_id', "sender", "content", "chatroom", "updatedAt", "createdAt");
        }));
    });
});
