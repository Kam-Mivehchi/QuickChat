import chai, { expect } from 'chai';
import User, { INewUser, IUser } from '../../models/user'
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
const request = chai.request("http://localhost:3001");


describe('User Routes', () => {
   let admin: IUser
   let member1: IUser
   let member2: IUser
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
      it('Gets a single chat', async () => {




      });
      it("get all chats for single User", async () => {



      });
      it('Creates a new chat room', async () => {



      });

      it('adds members to an existing chat', async () => {



      });

      it("Removes member from a room", async () => {


      });
      it("Celetes a chat", async () => {


      });
   })
});
