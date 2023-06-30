import db from '../config/connection'
import { User, Chatroom, Message } from '../models'
import bcrypt from 'bcrypt'

import userData from './userData.json'
import messageData from './messageData.json'


const max_messages_per_chat = 5
//hash user passwords
const hashedUserDataPromise = userData.map(async (user) => {
   let hashedPassword = await bcrypt.hash(user.password, 10);
   user.password = hashedPassword;
   return user;
})

db.once('open', async () => {
   // clean database
   console.log("User")
   await User.deleteMany({});
   await Chatroom.deleteMany({});
   await Message.deleteMany({});

   // execute hash promise
   const hashedUserData = await Promise.all(hashedUserDataPromise)

   // bulk create each model
   const users = await User.insertMany(hashedUserData);

   const createdChats = []
   //create chat between users
   for (let user of users) {

      //randomly find members that are't the current user
      const otherUsers = users.filter(person => person._id !== user._id)

      const randomIndex = Math.floor(Math.random() * otherUsers.length)

      const createDM = await Chatroom.create({
         roomName: "Direct Message",
         members: [user._id, otherUsers[randomIndex]._id],
         admin: user._id
      });




      const otherUsers2 = users.filter(person => person._id !== user._id || person._id !== otherUsers[randomIndex]._id)
      const randomIndex2 = Math.floor(Math.random() * otherUsers2.length)

      const createGroupChat = await Chatroom.create({
         roomName: "Group Message",
         members: [user._id, otherUsers[randomIndex]._id, otherUsers2[randomIndex2]._id],
         admin: user._id
      });

      createdChats.push(createDM)
      createdChats.push(createGroupChat)
   }

   //add messages to each chat
   for (let chat of createdChats) {

      for (let i = 0; i < Math.random() * max_messages_per_chat; i++) {

         await Message.create({
            sender: chat.members[Math.floor(Math.random() * chat.members.length)],
            content: messageData[Math.floor(Math.random() * messageData.length)].content,
            chatroom: chat._id,
         });

      }

   }

   //create group chats

   // const chatrooms = await Chatroom.insertMany(chatroomData);
   // const messages = await Message.insertMany(MessageData);

   // for (chat of chatrooms) {
   //    // randomly add each Chatroom to a User
   //    const tempUser = users[Math.floor(Math.random() * users.length)];
   //    tempUser.chatrooms.push(chat._id);
   //    await tempUser.save();

   //    // randomly add a Message to each Chatroom
   //    const tempMessage = messages[Math.floor(Math.random() * messages.length)];
   //    chat.message = tempMessage._id;
   //    await chat.save();

   //    // reference Chatroom on Message model, too
   //    tempMessage.chatrooms.push(chat._id);
   //    await tempMessage.save();
   // }

   console.log('all done!');
   process.exit(0);
});