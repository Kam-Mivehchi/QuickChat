export { };
declare global {

   interface IChatroom {
      _id: string;
      roomName: string;
      members: IUser[];
      lastMessage: IMessage | null;
      admin: IUser;
      isGroup: boolean;
      updatedAt: string;
      createdAt: string;

   }
   interface IMessage {
      _id: string;
      chatroom: IChatroom;
      content: string;
      sender: IUser;
      updatedAt: string;
      createdAt: string;
   }
   interface IUser {
      _id: string;
      username: string;
      email: string;
      password?: string;
      avatar?: string;
      bio?: string;
      isCorrectPassword?(password: string): boolean;
      updatedAt?: string;
      createdAt?: string;
   }
}