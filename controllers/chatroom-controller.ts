import User, { IUser } from '../models/user';
import Chatroom, { IChatroom } from '../models/chatroom';
import { Request, Response } from 'express';

// get single room only for dm
export async function getSingleChat(req: Request, res: Response) {
   try {

      const { members } = req.body;
      // const { chatId } = req.params;


      if (!members.length) {
         return res.send("No User Provided!");
      }

      let chat = await Chatroom.find({

         $and: [
            { members: { $elemMatch: { $eq: req.user!._id } } },
            { members: { $elemMatch: { $eq: members } } },
         ],
      })
         .populate("members", "-password")
         .populate("lastMessage");


      if (!chat.length) {
         return createChat(req, res)
      }

      res.json(chat[0])

   } catch (error) {

      console.error(error);
      res.status(500).json(error);

   }
}



//create new group chat
export async function createChat(req: Request, res: Response) {
   try {


      //members should be entered as an array of ids
      const { members } = req.body;

      // should be a fallback for getSingleChat
      const createChat = await Chatroom.create({
         chatName: "Direct Message",
         members: [req.user!._id, ...members],
         admin: req.user!._id
      });
      const fullChat = await Chatroom.findOne({ _id: createChat._id }).populate(
         "members",
         "-password"
      ).select("-__v");

      res.json(fullChat);
   } catch (error) {

      console.error(error);
      res.status(500).json(error);

   }
}

//add members
export async function addMemberToChat(req: Request, res: Response) {
   try {
      //members should be entered as an array of ids
      const { members } = req.body;
      const { chatId } = req.params;

      const addUser = await Chatroom.findByIdAndUpdate(
         chatId,
         {
            $addToSet: { members: { $each: members } },
         },
         {
            new: true,
         }
      )
         .populate("members", "-password")
         .populate("admin", "-password")
         .select("-__v");

      res.json(addUser)
   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }
}

//remove members
export async function removeMemberFromChat(req: Request, res: Response) {
   try {
      //members should be entered as an array of ids

      const { members } = req.body;
      const { chatId } = req.params;

      const addUser = await Chatroom.findByIdAndUpdate(
         chatId,
         {
            $pullAll: { members: members },
         },
         {
            new: true,
         }
      )
         .populate("members", "-password")
         .populate("admin", "-password")
         .select("-__v");
      res.json(addUser)
   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }
}
//remove members
export async function deleteChat(req: Request, res: Response) {
   try {
      const toDelete = await Chatroom.findOne({ _id: req.params.chatId })




      if (req.user!._id.toString() !== toDelete?.admin.toString()) {
         return res.status(402).json({ message: 'Only the admin can delete this chat' });
      }

      await Chatroom.findOneAndDelete({ _id: req.params.chatId })
      res.json({ message: 'Chat has been deleted!' });

   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }

}

export async function getChatById(req: Request, res: Response) {

   try {
      const chat = await Chatroom.findOne({ _id: req.params.chatId })
         .populate("members", "-password")
         .populate("lastMessage")
         .select("-__v");

      res.json(chat);


   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }
}