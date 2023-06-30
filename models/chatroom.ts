import { Schema, model, Types, ObjectId } from 'mongoose';


export interface IChatroom extends Document {
   _id: ObjectId;
   roomName: string;
   members: ObjectId[];
   lastMessage: ObjectId;
   admin: ObjectId;
   isGroup: () => boolean;

}


const chatroomSchema = new Schema<IChatroom>(
   {
      roomName: {
         type: String,
         default: "Direct Message",
         trim: true,
      },
      members: [
         {
            type: Types.ObjectId,
            ref: "User",
         },
      ],
      lastMessage: {
         type: Types.ObjectId,
         ref: "Message",
      },
      admin: {
         type: Types.ObjectId,
         ref: "User",
      },
   },
   {
      timestamps: true,
      id: false,
      toJSON: {
         virtuals: true,
      },
   }
)

chatroomSchema.virtual('isGroup').get(function () {
   return this.members.length > 2;
});

export default model("Chat", chatroomSchema);