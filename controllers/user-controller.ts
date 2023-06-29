import User, { IUser } from '../models/user';
import { Request, Response } from 'express';
import { generateToken, UserPayload } from '../utils/auth';



//create an account and token
export async function register(req: Request, res: Response) {
   try {
      const user: IUser | null = await User.create(req.body)

      const { _id, username, email }: UserPayload = user
      if (!user) {
         return res.status(400).json({ message: 'Something is wrong!' });
      }
      const token = generateToken({ _id, username, email });
      res.json({ token, user });
      // res.json(newUser);
   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }
}


//login
export async function login({ body }: Request, res: Response) {
   const user: IUser | null = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] }).select('-__v')

   if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
   }

   const { _id, username, email }: UserPayload = user

   const correctPw = await user.isCorrectPassword(body.password);

   if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
   }
   const token = generateToken({ _id, username, email });
   res.json({ token, user });

}

// get all users
export async function getUsers(_req: Request, res: Response) {
   try {
      const allUsers: IUser[] = await User.find()
         .select('-__v')

      res.json(allUsers);


   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }
}

// get single user by id
export async function getMe(req: Request, res: Response) {
   try {
      const user: IUser | null = await User.findOne({ _id: req.params.id })
         .select('-__v')

      if (!user) {
         return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }
      res.json(user)
   } catch (error) {
      console.error(error);
      res.status(500).json(error)
   }
}




// update a user not their password
export async function updateUser(req: Request, res: Response) {
   //do not allow psw change on this route
   if (req.body.hasOwnProperty('password')) {
      return res.status(404).json({ message: 'Cannot updated password with this route, Use /api/users/:id/recovery' });

   }
   try {
      const updatedUser: IUser | null = await User.findOneAndUpdate(
         { _id: req.params.id },
         {
            $set: req.body,
         },
         {
            runValidators: true,
            new: true,
         }
      ).select('-__v')

      if (!updatedUser) {
         return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(updatedUser);

   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }

}
export async function updatePassword(req: Request, res: Response) {

   try {
      const user: IUser | null = await User.findOne({ _id: req.params.id }).select('-__v');


      if (!user) {
         return res.status(404).json({ message: 'No user with this id!' });
      }

      user.password = req.body.password;
      await user.save();
      const { _id, username, email, bio, avatar } = user;
      res.json({ _id, username, email, bio, avatar });

   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }

}

// delete user 
export async function deleteUser(req: Request, res: Response) {

   try {
      await User.findOneAndDelete({ _id: req.params.id })
      res.json({ message: 'User and associated thoughts deleted!' });

   } catch (error) {
      console.error(error);
      res.status(500).json(error);
   }

}




