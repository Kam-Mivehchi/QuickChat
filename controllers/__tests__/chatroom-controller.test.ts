import chai, { expect } from 'chai';
import { IChatroom, IUser, User, Message } from '../../models/'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const request = chai.request("http://localhost:3001");


describe('Chat Routes', () => {
   let admin: IUser
   let member1: IUser
   let member2: IUser
   let example_chat: IChatroom
   let example_dm: IChatroom
   let token: string;
   before(async () => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')
      // await Chatroom.deleteMany({})

      // get token
      admin = await User.create({
         username: "Chat-controller-test_Admin",
         email: "Chat-controller-test_Admin@test.com",
         password: "asdfasdf"
      } as IUser)

      const response = await request.post('/api/users/login').send({
         username: "Chat-controller-test_Admin",
         email: "Chat-controller-test_Admin@test.com",
         password: "asdfasdf"
      } as IUser)

      token = response.body.token

      //create 3 users
      member1 = await User.create({
         username: "Chat-controller-test_Member1",
         email: "Chat-controller-test_Member1@test.com",
         password: "asdfasdf"
      } as IUser)
      member2 = await User.create({
         username: "Chat-controller-test_Member2",
         email: "Chat-controller-test_Member2@test.com",
         password: "asdfasdf"
      } as IUser)

      //1 admin

      //2 members
   });

   after(async () => {
      // Disconnect from the test database
      await User.deleteOne({
         username: "Chat-controller-test_Admin",
      })
      await User.deleteOne({
         username: "Chat-controller-test_Member1",
      })
      await User.deleteOne({
         username: "Chat-controller-test_Member2",
      })
      // await Chatroom.deleteMany({})

      await mongoose.disconnect();
   });


   describe("/api/chat", () => {
      it('Creates a new chat room between admin and member1', async () => {

         const response = await request.post(`/api/chat/`).set("Authorization", "Bearer " + token).send({ members: [member1._id] })

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "admin", "isGroup", "updatedAt", "createdAt");

         example_dm = response.body;


      });
      it('Creates a group chat', async () => {

         const response = await request.post(`/api/chat/`).set("Authorization", "Bearer " + token).send({ members: [member1._id, member2._id] })

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "admin", "isGroup", "updatedAt", "createdAt");

         example_chat = response.body;

      });
      it("get chat by id", async () => {
         const response = await request.get(`/api/chat/${example_dm._id}`).set("Authorization", "Bearer " + token)

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "admin", "isGroup", "updatedAt", "createdAt");
         // expect(response.body.members.length).to.have.lengthOf(2)
         // expect(response.body.members).to.not.include(member2)
      });
      it('Gets a single chat between 2 people', async () => {

         const response = await request.post(`/api/chat/view`).set("Authorization", "Bearer " + token).send({ members: [member2._id] })

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "admin", "isGroup", "updatedAt", "createdAt");


      });


      it('adds members to an existing chat', async () => {

         const response = await request.put(`/api/chat/${example_dm._id}/add`).set("Authorization", "Bearer " + token).send({ members: [member2._id] })

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "admin", "isGroup", "updatedAt", "createdAt");
         expect(response.body.members).to.have.lengthOf(3)


      });

      it("Removes member from a room", async () => {
         const response = await request.put(`/api/chat/${example_dm._id}/remove`).set("Authorization", "Bearer " + token).send({ members: [member2._id] })
         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "admin", "isGroup", "updatedAt", "createdAt");
         expect(response.body.members).to.have.lengthOf(2)


      });
      it("deletes a chat", async () => {
         const response = await request.delete(`/api/chat/${example_dm._id}`).set("Authorization", "Bearer " + token)

         expect(response.status).to.equal(200);

      });

   })
});

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

      token = response.body.token
      test_user = response.body.user
      let response2 = await request.get(`/api/users/chats`).set("Authorization", "Bearer " + token)
      test_chat = response2.body[0]


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
         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('array');
         expect(response.body[0]).to.have.all.keys('_id', "sender", "content", "chatroom", "updatedAt", "createdAt");




      });
   })
})

