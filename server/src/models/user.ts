import { Schema, model, ObjectId, Document } from 'mongoose';
import bcrypt from "bcrypt";




export interface IUser extends Document {
   _id: ObjectId;
   username: string;
   email: string;
   password: string;
   avatar?: string;
   bio?: string;
   isCorrectPassword(password: string): boolean;
}
export interface INewUser {
   _id?: ObjectId;
   username: string;
   email: string;
   password: string;
   avatar?: string;
   bio?: string;
   isCorrectPassword?: (password: string) => boolean;
}

const userSchema = new Schema<IUser>(
   {
      username: {
         type: String,
         required: [true, "Username missing in Request"],
         unique: true,
         trim: true,
      },
      email: {
         type: String,
         required: [true, "Email missing in Request"],
         unique: true,
         match: [/.+@.+\..+/, 'Must match an email address!'],
         trim: true,
      },
      password: {
         type: String,
         required: [true, "Password missing in Request"],
         minlength: 8,
         trim: true,
      },
      bio: {
         type: String,
         default: "Share something about yourself",
         trim: true,
      },
      avatar: {
         type: String,
         default: "https://robohash.org/mail@ashallendesign.co.uk",
      },
   },
   {
      toJSON: {
         virtuals: true,
      },
      id: false,

   }
);

// hash user password
userSchema.pre('save', async function (next) {

   if (this.isNew || this.isModified('password')) {
      const saltRounds: number = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
   }

   next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
   return bcrypt.compare(password, this.password);
};



export default model<IUser>('User', userSchema);
