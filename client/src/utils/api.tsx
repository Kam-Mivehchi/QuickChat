import Auth from './auth';
import axios from 'axios';
const api = axios.create({
   baseURL: 'http://localhost:3001/api'
});
interface INewMessage {
   chatroom: string;
   content: string;
}
export async function sendMessage(body: INewMessage) {
   try {
      const response = await api.post(`/chat/${body.chatroom}`, body, {
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