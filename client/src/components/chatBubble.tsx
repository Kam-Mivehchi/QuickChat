import React from 'react'
import Auth from '../utils/auth'


function ChatBubble({ message }: { message: IMessage }) {
   return (
      <div className={`chat  ${message.sender._id === Auth.getProfile()._id ? "chat-end" : "chat-start"}`} data-message={message._id}>
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
}

export default ChatBubble