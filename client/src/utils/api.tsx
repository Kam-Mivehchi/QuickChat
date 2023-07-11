import Auth from './auth';
import axios from 'axios';




interface INewMessage {
   chatroom: string;
   content: string;
}

interface IReturningUser {
   email: string;
   password: string;
}
interface authResponse {
   user: IUser;
   token: string;
}
interface INewUser {
   email: string;
   password: string;
   username: string;
}
interface IChatroomQueryParam {
   chatId?: string;
}
interface IUserQueryParam {
   userId?: string;
}
interface IUpdateUserBody {
   username?: string;
   email?: string;
   bio?: string;
   avatar?: string;
}

const api = axios.create({
   baseURL: import.meta.env.VITE_SERVER_URL,
   headers: {
      Authorization: 'Bearer ' + Auth.getToken()
   }
});
axios.interceptors.response.use(
   response => response,
   error => {
      if (error.response.status === 401) {
         window.location.href = '/';
      }
   });
// USER ROUTES
export async function sendMessage(body: INewMessage) {
   const response = await api.post(`/chat/${body.chatroom}`, body);
   const data = response.data as unknown as IMessage[]
   return data;
}

export async function login(userData: IReturningUser): Promise<authResponse> {
   const response = await api.post('/users/login', userData)
   const data = response.data as unknown as authResponse
   return data;
}

export async function register(userData: INewUser): Promise<authResponse> {
   const response = await api.post('/users/register', userData)
   const data = response.data as unknown as authResponse
   return data;
}

export async function searchForUsers(input: string): Promise<IUser[]> {
   const response = await api.post(`/users/`, { input: input });
   const data = response.data as unknown as IUser[]
   return data;
}
export async function getSingleUser({ params }: { params: IUserQueryParam }): Promise<IUser> {
   const response = await api.get(`/users/${params.userId}`);
   const data = response.data as unknown as IUser
   return data;
}

export async function updateUser(params: string, body: IUpdateUserBody): Promise<IUser> {
   const response = await api.put(`/users/${params}`, body);
   const data = response.data as unknown as IUser
   return data;
}

export async function deleteUser({ params }: { params: IUserQueryParam }): Promise<string> {
   const response = await api.delete(`/users/${params.userId}`);
   const data = response.data as unknown as string
   return data;
}

export async function updatePassword({ params, newPassword }: { params: IUserQueryParam, newPassword: string }): Promise<IUser> {
   const response = await api.put(`/users/${params.userId}/recovery`, { password: newPassword });
   const data = response.data as unknown as IUser
   return data;
}

// CHAT ROUTES
export async function createGroupChat({ members }: { members: string[] }): Promise<IChatroom> {
   const response = await api.post(`/chat/`, { members: members });
   const data = response.data as unknown as IChatroom
   return data;
}
// CHAT ROUTES
export async function createDM(member: string): Promise<IChatroom> {
   const response = await api.post(`/chat/dm`, { members: [member] });
   const data = response.data as unknown as IChatroom
   return data;
}

export async function getAllChats(): Promise<IChatroom[]> {
   const response = await api.get("/users/chats");
   const data = response.data as unknown as IChatroom[]
   return data;

}
export async function getSingleChat(chatId: string): Promise<IChatroom> {
   const response = await api.get(`/chats/${chatId}`);
   const data = response.data as unknown as IChatroom
   return data;

}

export async function getAllMessages({ params }: { params: IChatroomQueryParam }): Promise<IMessage[]> {
   const response = await api.get(`/chat/${params.chatId}/messages`);

   const data = response.data as unknown as IMessage[]
   return data;
}

export async function deleteChat({ params }: { params: IChatroomQueryParam }): Promise<string> {
   const response = await api.delete(`/chat/${params.chatId}`);
   const data = response.data as unknown as string
   return data;
}

export async function addMemberToChat({ params, members }: { params: IChatroomQueryParam, members: string[] }): Promise<IChatroom> {
   const response = await api.put(`/chat/${params.chatId}/add`, { members: members });
   const data = response.data as unknown as IChatroom
   return data;

}

export async function removeMemberFromChat({ params, members }: { params: IChatroomQueryParam, members: string[] }): Promise<IChatroom> {
   const response = await api.put(`/chat/${params.chatId}/remove`, { members: members });
   const data = response.data as unknown as IChatroom
   return data;

}



