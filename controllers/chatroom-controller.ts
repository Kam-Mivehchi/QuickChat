import User, { IUser } from '../models/user';
import Chatroom, { IChatroom } from '../models/chatroom';
import { Request, Response } from 'express';

// get single room
export async function getSingleChat(req: Request, res: Response) { }



//create new room
export async function createChat(req: Request, res: Response) {

   // should be a fallback for getSingleChat
}

//add members
export async function addMemberToChat(req: Request, res: Response) { }

//remove members
export async function removeMemberFromChat(req: Request, res: Response) { }
//remove members
export async function deleteChat(req: Request, res: Response) { }