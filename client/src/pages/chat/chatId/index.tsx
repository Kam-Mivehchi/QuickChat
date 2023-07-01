import * as React from 'react';
import {
   useLoaderData,
   Link,
   useParams
} from "react-router-dom";
import Auth from "../../../utils/auth"
import { useSelector, useDispatch, } from 'react-redux'
import { ActionTypes, AppState } from "../../../utils/redux/reducers.tsx"
import { AppDispatch } from "../../../utils/redux/store.tsx";
import { sendMessage } from "../../../utils/api"
export interface ISingleChatProps {
}

export default function SingleChat(props: ISingleChatProps) {
   let { chatId } = useParams();
   const dispatch = useDispatch<AppDispatch>()
   const data = useLoaderData() as IMessage[];
   const state = useSelector(state => state) as AppState


   const [isTyping, setIsTyping] = React.useState<boolean>(false)
   const [newMessage, setNewMessage] = React.useState<string>("")
   console.log(data)

   React.useEffect(() => {

      dispatch({ type: ActionTypes.SET_LOADING, loading: true });
      dispatch({ type: ActionTypes.SET_MESSAGES, messages: [...data] });
      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: chatId });
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });
      console.log(state.allChats)
      // socket.emit("join-chat", chatId);

      return (): void => {
         dispatch({ type: ActionTypes.SET_MESSAGES, messages: [] })
         dispatch({ type: ActionTypes.SET_ERROR, error: false });

      };
   }, [])


   async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      try {
         const response = await sendMessage({ chatroom: chatId as string, content: newMessage })

         dispatch({ type: ActionTypes.ADD_NEW_MESSAGE, message: response });


         setNewMessage("")
      } catch (error) {
         dispatch({ type: ActionTypes.SET_ERROR, error: true });
      }
   }
   async function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
      setIsTyping(true);

      setNewMessage(event.target.value)
   }
   if (state.isLoading) {
      return <div className="loader">loading</div>

   }
   return (
      <div className="hero min-h-screen bg-base-200">

         <div className="card bg-base-100 shadow-xl w-full overflow-auto h-screen py-2">

            {state.chatMessages.map((message: IMessage) => {
               return (
                  <div className={`chat  ${message.sender._id === Auth.getProfile()._id ? "chat-end" : "chat-start"}`} key={message._id} data-message={message._id}>
                     <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                           <img src={message.sender.avatar} />
                        </div>
                     </div>
                     <div className="chat-header">
                        {message.sender.username}
                        <time className="text-xs opacity-50">{message.createdAt}</time>
                     </div>
                     <div className="chat-bubble">{message.content}</div>
                     <div className="chat-footer opacity-50">
                        Delivered
                     </div>
                  </div>
               )
            })}
            <form className="" onSubmit={handleSendMessage}>

               <input type="text" placeholder="send a message" className="input input-bordered max-w-xs " onChange={handleTyping} value={newMessage} />
               {newMessage}
               <button type="submit" className="btn btn-primary w-16">Send</button>
            </form>
         </div>
         {/* Message input */}
      </div>
   );
}