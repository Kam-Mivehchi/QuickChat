import * as React from 'react';
import {

   useLoaderData,
   Link,
} from "react-router-dom";
import Auth from "../../../utils/auth"
export interface ISingleChatProps {
}

export default function SingleChat(props: ISingleChatProps) {
   const data = useLoaderData() as IMessage[];
   const [newMessage, setNewMessage] = React.useState<string>("")
   console.log(data)

   function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()

      try {

         setNewMessage("")
      } catch (error) {

      }
   }
   return (
      <div className="hero min-h-screen bg-base-200">

         <div className="card bg-base-100 shadow-xl w-full overflow-auto h-screen py-2">

            {data.map((message: IMessage) => {
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

               <input type="text" placeholder="send a message" className="input input-bordered max-w-xs " onChange={(e) => setNewMessage(e.target.value)} value={newMessage} />
               {newMessage}
               <button type="submit" className="btn btn-primary w-16">Send</button>
            </form>
         </div>
         {/* Message input */}
      </div>
   );
}