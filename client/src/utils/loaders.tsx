import { Outlet, Link } from "react-router-dom";
// import { getAllChats } from "../api";
import axios from 'axios'
import Auth from './auth';
const api = axios.create({
   baseURL: 'http://localhost:3001/api'
});

export async function allChatLoader() {
   try {
      const response = await api.get("/users/chats", {
         headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
         }
      });

      const data = response.data as unknown as IChatroom[]
      return data;
   } catch (error) {
      console.error(error);
   }

}

interface IQueryParam {
   chatId?: string
}
export async function chatMessagesLoader({ params }: { params: IQueryParam }) {
   try {
      const response = await api.get(`/chat/${params.chatId}/messages`, {
         headers: {
            Authorization: `Bearer ${Auth.getToken()}`,
         }
      });

      const data = response.data as unknown as IMessage[]
      return data;
   } catch (error) {
      console.error(error);
   }

}