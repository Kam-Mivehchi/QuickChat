// const jwt = require('jsonwebtoken');
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"
import 'dotenv/config'
// import { ObjectId } from 'bson';
import { ObjectId } from 'mongoose';
// set token secret and expiration date
const secret = process.env.JWT_SECRET as Secret;
const expiration = '2h';


export interface UserPayload extends JwtPayload {
  _id: ObjectId;
  username: string;
  email: string;

}
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
// function for our authenticated routes
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  let token: string | undefined;

  if (req.query.token) {
    token = req.query.token as string;
  } else {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      token = authorizationHeader.split(' ')[1];
    }
  }

  if (!token) {
    res.status(401).json({ message: 'You have no token!' });
    return;
  }
  const secret = process.env.JWT_SECRET;

  // verify token and get user data out of it
  try {
    const data = jwt.verify(token, secret as Secret, { maxAge: expiration }) as unknown as UserPayload;
    req.user = data;
    next();

  } catch {
    console.log('Invalid token');
    res.status(400).json({ message: 'invalid token!' });
    return
  }

  // send to next endpoint
}

export function generateToken(userPayload: UserPayload): string {

  return jwt.sign(userPayload, secret, { expiresIn: expiration });

}

