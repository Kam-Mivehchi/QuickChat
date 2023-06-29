import User, { IUser } from '../models/user';
import Chatroom, { IChatroom } from '../models/chatroom';
import Message, { IMessage } from '../models/message';
import { Request, Response } from 'express';


export async function sendMessage(req: Request, res: Response) {
   const { content, chatId } = req.body;

   if (!content || !chatId) {
      res.status(500).json({ message: "Bad Request: missing message or chatId" });
      return
   }

   let newMessage = {
      sender: req.user!._id,
      content: content,
      chat: chatId,
   };

   let message = await Message.create(newMessage);

   message = await message.populate("sender", "username avatar");
   message = await message.populate("chat");


   await Chatroom.findByIdAndUpdate(chatId, { lastMessage: message }, { new: true });

   res.json(message);
};

export async function allMessages(req: Request, res: Response) {
   try {
      const { chatId } = req.params;

      const getMessage = await Message.find({ chat: chatId })
         .populate("sender", "username avatar email _id")
         .populate("chat");

      res.json(getMessage);

   } catch (error) {
      console.error(error);
      res.status(500).json(error)
   }
};
