import "mocha"
import chai from 'chai';
import mongoose from 'mongoose';
import { User, IUser, INewUser, Chatroom, INewChatroom } from '../'


chai.should();
describe('Chatroom Model', async () => { // the tests container

   let admin: IUser
   let member1: IUser
   let member2: IUser
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

      //1 admin

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

      await mongoose.disconnect();
   });




   it('should create a direct message', async () => { // the single test
      const newChat: INewChatroom = {
         admin: admin!._id,
         members: [admin!._id, member1!._id]
      }
      const chatroomDoc = await Chatroom.create(newChat);

      chatroomDoc._id.should.exist;
      chatroomDoc.isGroup.should.equal(false);



      await Chatroom.deleteOne({
         _id: chatroomDoc._id,
      })


   }
   );
   it('should create a group message', async () => { // the single test
      const newChat: INewChatroom = {
         admin: admin!._id,
         members: [admin!._id, member1!._id, member2!._id]
      }
      const chatroomDoc = await Chatroom.create(newChat);


      chatroomDoc._id.should.exist;
      chatroomDoc.isGroup.should.equal(true);

      await Chatroom.deleteOne({
         _id: chatroomDoc._id,
      })

   }
   );
   it("should add a user to dm to create a group chat", async () => {
      const newChat: INewChatroom = {
         admin: admin!._id,
         members: [admin!._id, member1!._id]
      }
      const chatroomDoc = await Chatroom.create(newChat);
      const addUser = await Chatroom.findByIdAndUpdate(
         chatroomDoc._id,
         {
            $push: { members: member2!._id },
         },
         {
            new: true,
         }
      )


      addUser!.isGroup.should.equal(true);

   });
   it("should remove user from a group chat", async () => {
      const newChat: INewChatroom = {
         admin: admin!._id,
         members: [admin!._id, member1!._id, member2!._id]
      }
      const chatroomDoc = await Chatroom.create(newChat);
      const addUser = await Chatroom.findByIdAndUpdate(
         chatroomDoc._id,
         {
            $pull: { members: member2!._id },
         },
         {
            new: true,
         }
      )


      addUser!.isGroup.should.equal(false);
      addUser!.members.length.should.equal(2)


   })



});
