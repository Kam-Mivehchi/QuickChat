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
const user_1 = __importDefault(require("../../models/user"));
const chai_http_1 = __importDefault(require("chai-http"));
const mongoose_1 = __importDefault(require("mongoose"));
chai_1.default.use(chai_http_1.default);
const request = chai_1.default.request("http://localhost:3001");
describe('User Routes', () => {
    before(() => {
        // Connect to the test database or create a separate test database
        mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app');
    });
    after(() => __awaiter(void 0, void 0, void 0, function* () {
        // Disconnect from the test database
        yield user_1.default.deleteOne({ username: "controller-test-user" });
        yield user_1.default.deleteOne({ username: "updated-controller-test-user" });
        yield mongoose_1.default.disconnect();
    }));
    describe("/api/users", () => {
        const newUser = {
            username: "controller-test-user",
            email: "controller-test-user@email.com",
            password: "asdfasdf"
        };
        let test_user;
        it('Register', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/api/users/register').send(newUser);
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            test_user = response.body.user;
            (0, chai_1.expect)(response.body).to.be.an('object');
            (0, chai_1.expect)(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body.user).to.have.all.keys("__v", "_id", "username", "email", "password", "bio", "avatar");
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it("Login", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/api/users/login').send({
                email: "controller-test-user@email.com",
                password: "asdfasdf"
            });
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            (0, chai_1.expect)(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body.user).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it('getUsers', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/api/users');
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it("getMe", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/users/${test_user._id}`);
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            // expect(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it("update username", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put(`/api/users/${test_user._id}`).send({ username: "updated-controller-test-user" });
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            // expect(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
            (0, chai_1.expect)(response.body.username).to.equal("updated-controller-test-user");
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it("update bio", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put(`/api/users/${test_user._id}`).send({ bio: "updated bio" });
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            // expect(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
            (0, chai_1.expect)(response.body.bio).to.equal("updated bio");
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it("update avatar", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put(`/api/users/${test_user._id}`).send({ avatar: "update" });
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            // expect(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
            (0, chai_1.expect)(response.body.avatar).to.equal("update");
            // expect(response.body).to.have.lengthOf.at.least(1);
        }));
        it("update password", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put(`/api/users/${test_user._id}/recovery`).send({ password: "newpassword" });
            // allUsers.res.should.have.lengthOf.at.least(1);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('object');
            // expect(response.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(response.body).to.have.all.keys('_id', "username", "email", "bio", "avatar");
            const checkPSW = yield request.post('/api/users/login').send({
                email: "controller-test-user@email.com",
                password: "newpassword"
            });
            (0, chai_1.expect)(checkPSW.status).to.equal(200);
            (0, chai_1.expect)(checkPSW.body).to.be.an('object');
            (0, chai_1.expect)(checkPSW.body).to.have.all.keys('token', 'user');
            (0, chai_1.expect)(checkPSW.body.user).to.have.all.keys('_id', "username", "email", "password", "bio", "avatar");
        }));
        it('delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete(`/api/users/${test_user._id}`);
            (0, chai_1.expect)(response.status).to.equal(200);
        }));
        it("get all chats for single User", () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get(`/api/users/${test_user._id}/chats`);
            (0, chai_1.expect)(response.status).to.equal(200);
            (0, chai_1.expect)(response.body).to.be.an('array');
            (0, chai_1.expect)(response.body[0]).to.have.all.keys('_id', "roomName", "members", "lastMessage", "admin", "isGroup");
            //add code to make sure the user is in each chat
        }));
    });
});
