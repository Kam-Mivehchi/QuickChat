import { Schema, model, Types, ObjectId } from 'mongoose';


export interface IChatroom {
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
      toJSON: {
         virtuals: true,
      },
   }
)

chatroomSchema.virtual('isGroupChat').get(function () {
   return this.members.length > 2;
});

export default model("Chat", chatroomSchema);