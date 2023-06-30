import { Schema, model, Types, ObjectId } from 'mongoose';
import { IChatroom, IUser } from '../models'

export interface IMessage extends Document {
   _id: ObjectId;
   chatroom: ObjectId | IChatroom;
   content: string;
   sender: ObjectId | IUser;
}


const messageSchema = new Schema<IMessage>(
   {
      sender: {
         type: Types.ObjectId,
         ref: "User",
      },
      chatroom: {
         type: Types.ObjectId,
         ref: "Chat",
      },
      content: {
         type: String,
         trim: true,
      },
   },
   {
      timestamps: true,
      id: false,

   }
);

export default model("Message", messageSchema);