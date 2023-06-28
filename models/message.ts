import { Schema, model, Types, ObjectId } from 'mongoose';

export interface IMessage {
   _id: ObjectId;
   chatroom: ObjectId;
   content: string;
   sender: ObjectId;
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
   }
);

export default model("Message", messageSchema);