import "mocha"
import chai, { expect } from 'chai';
import mongoose from 'mongoose';
import User, { IUser, INewUser } from '../user'
import Chatroom, { IChatroom, INewChatroom } from '../chatroom'
import Message, { IMessage } from '../message'

chai.should();
describe('Message Model', async () => { // the tests container

   let admin: IUser
   let member1: IUser
   let member2: IUser
   let chatroom_test: IChatroom
   before(async () => {
      // Connect to the test database or create a separate test database
      mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/messaging-app')

      //create 3 users

      admin = await User.create({
         username: "TestSuiteChatModel_Admin",
         email: "TestSuiteChatModel_Admin@test.com",
         password: "asdfasdf"
      } as INewUser);
      member1 = await User.create({
         username: "TestSuiteChatModel_Member1",
         email: "TestSuiteChatModel_Member1@test.com",
         password: "asdfasdf"
      } as INewUser)
      member2 = await User.create({
         username: "TestSuiteChatModel_Member2",
         email: "TestSuiteChatModel_Member2@test.com",
         password: "asdfasdf"
      } as INewUser)

      //create a chatroom

      chatroom_test = await Chatroom.create({
         admin: admin!._id,
         members: [admin!._id, member1!._id]
      });
      //2 members
   });

   after(async () => {
      // Disconnect from the test database
      await User.deleteOne({
         username: "TestSuiteChatModel_Admin",
      })
      await User.deleteOne({
         username: "TestSuiteChatModel_Member1",
      })
      await User.deleteOne({
         username: "TestSuiteChatModel_Member2",
      })
      await Chatroom.deleteOne({
         _id: chatroom_test._id,
      })

      await mongoose.disconnect();
   });




   it('should create a new message', async () => { // the single test
      const message: IMessage = await Message.create({
         chatroom: chatroom_test._id,
         content: "test content",
         sender: admin._id
      })

      message._id.should.exist

      message!.chatroom.should.equal(chatroom_test._id)
      message!.content.should.equal("test content")
      message!.sender.should.equal(admin._id)

   }
   );



});
