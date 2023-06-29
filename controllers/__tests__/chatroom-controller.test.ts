import chai, { expect } from 'chai';
import User, { INewUser, IUser } from '../../models/user'
import Chatroom, { IChatroom, INewChatroom } from '../../models/chatroom'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const request = chai.request("http://localhost:3001");


describe('Chat Routes', () => {
   let admin: IUser
   let member1: IUser
   let member2: IUser
   let example_chat: IChatroom
   before(async () => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')

      //create 3 users

      admin = await User.create({
         username: "Chat-controller-test_Admin",
         email: "Chat-controller-test_Admin@test.com",
         password: "asdfasdf"
      } as INewUser);
      member1 = await User.create({
         username: "Chat-controller-test_Member1",
         email: "Chat-controller-test_Member1@test.com",
         password: "asdfasdf"
      } as INewUser)
      member2 = await User.create({
         username: "Chat-controller-test_Member2",
         email: "Chat-controller-test_Member2@test.com",
         password: "asdfasdf"
      } as INewUser)

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

      await mongoose.disconnect();
   });


   describe("/api/chat", () => {
      it('Creates a new chat room', async () => {

         const response = await request.post(`/api/chat/`).send({
            roomName: "",
            members: [admin._id, member1._id],
            admin: admin._id,
         })

         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "lastMessage", "admin", "isGroup");

         example_chat = response.body;

      });
      it('Gets a single chat', async () => {

         const response = await request.get(`/api/chat/${example_chat._id}`)
         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "lastMessage", "admin", "isGroup");


      });


      it('adds members to an existing chat', async () => {

         const response = await request.put(`/api/chat/${example_chat._id}/add`).send({ user: member2._id })
         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "lastMessage", "admin", "isGroup");
         expect(response.body.members).to.have.lengthOf(3)
         expect(response.body.members).to.include(member2)

      });

      it("Removes member from a room", async () => {
         const response = await request.put(`/api/chat/${example_chat._id}/remove`).send({ user: member2._id })
         expect(response.status).to.equal(200);
         expect(response.body).to.be.an('object');
         expect(response.body).to.have.all.keys('_id', "roomName", "members", "lastMessage", "admin", "isGroup");
         expect(response.body.members.length).to.have.lengthOf(2)
         expect(response.body.members).to.not.include(member2)

      });
      it("deletes a chat", async () => {

         const response = await request.put(`/api/chat/${example_chat._id}`)

         expect(response.status).to.equal(200);

         expect(response.body.members.length).to.have.lengthOf(2)
         expect(response.body.members).to.not.include(member2)
      });
   })
});
