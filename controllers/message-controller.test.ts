import chai, { expect } from 'chai';
import User, { INewUser, IUser } from '../models/user'
import Chatroom, { IChatroom, INewChatroom } from '../models/chatroom'
import Message from '../models/message'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const request = chai.request("http://localhost:3001");


describe('Message Routes', () => {
   let test_user: IUser;

   let test_chat: IChatroom
   let token: string;
   before(async () => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')

      //sign in as john doe
      let response = await request.post(`/api/users/login`).send({
         username: "john_doe",
         email: "john@example.com",
         password: "asdfasdf"
      })
      console.log(response.body)
      token = response.body.token
      test_user = response.body.user
      let response2 = await request.get(`/api/users/chats`).set("Authorization", "Bearer " + token)
      test_chat = response2.body[0]

      console.log(test_chat)
   });

   after(async () => {
      // Disconnect from the test database


      await mongoose.disconnect();
   });


   describe("/api/chat", () => {
      it('send message to a chat', async () => {

         const response = await request.post(`/api/chat/${test_chat._id}`).set("Authorization", "Bearer " + token).send({ content: "this is a test" })

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "chatroom", "content", "__v", "updatedAt", "createdAt", "sender");

         const message = await Message.findOne({ _id: response.body._id })

         expect(message).to.be.an('object');

         expect(message!.content).to.equal("this is a test")



      });
      it('get all Messages for a single chat', async () => {

         const response = await request.get(`/api/chat/${test_chat._id}/messages`).set("Authorization", "Bearer " + token)
         console.log(response.body[0])
         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('array');
         expect(response.body[0]).to.have.all.keys('_id', "sender", "content", "chatroom", "updatedAt", "createdAt");




      });
   })
})
