
import Chatroom, { IChatroom } from '../models/chatroom';
import Message, { IMessage } from '../models/message';
import { Request, Response } from 'express';


export async function sendMessage(req: Request, res: Response) {
   const { content } = req.body;
   const { chatId } = req.params;

   if (!content || !chatId) {
      res.status(500).json({ message: "Bad Request: missing message or chatId" });
      return
   }

   let newMessage = {
      sender: req.user!._id,
      content: content,
      chatroom: chatId,
   };

   let message = await Message.create(newMessage);

   message = await message.populate("sender", "username avatar");
   message = await message.populate("chatroom");


   await Chatroom.findByIdAndUpdate(chatId, { lastMessage: message }, { new: true }) as IChatroom;

   res.json(message as unknown as IMessage);
};

export async function allMessages(req: Request, res: Response) {
   try {
      const { chatId } = req.params;
      console.log(chatId);
      const getMessage = await Message.find({ chatroom: chatId })
         .populate("sender", "username avatar email _id")
         .populate("chatroom").select("-__v");

      res.json(getMessage as unknown as IMessage);

   } catch (error) {
      console.error(error);
      res.status(500).json(error)
   }
};
