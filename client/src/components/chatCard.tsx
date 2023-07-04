import React from 'react'
import {
   Link,
} from "react-router-dom";
import dayjs from "dayjs"
import Auth from "../utils/auth"



function ChatCard({ chatroom }: { chatroom: IChatroom }) {

   return (
      <Link to={`/chat/${chatroom._id}`}  >

         <div key={`${chatroom._id}`} className="border-4  card bg-base-100 shadow-xl " >
            <div className="card-body p-2">



               {!chatroom.lastMessage
                  ?
                  <div className="lastMessage border-2" >
                     No Messages found
                  </div>
                  :

                  <div className="lastMessage  flex items-center gap-x-2" data-message={chatroom.lastMessage._id} >
                     <div className="flex flex-col items-center ">

                        <div className="avatar-group -space-x-6">

                           <div className="avatar">
                              <div className="w-8 bg-slate-300">
                                 {chatroom.isGroup ?

                                    <img src={chatroom.lastMessage.sender.avatar} alt={`${chatroom.lastMessage.sender.avatar} avatar image`} />

                                    :
                                    <h1 className="card-title text-sm">
                                       <>
                                          <img src={chatroom.members.filter((user) => user._id !== Auth.getProfile()._id)[0].avatar} alt={`${chatroom.members.filter((user) => user._id !== Auth.getProfile()._id)[0].avatar} avatar image`} />

                                       </>
                                    </h1>

                                 }
                              </div>
                           </div>
                        </div>
                        <p className="truncate text-xs">
                           {chatroom.isGroup ?


                              chatroom.lastMessage.sender.username

                              :
                              chatroom.members.filter((user) => user._id !== Auth.getProfile()._id)[0].username


                           }
                        </p>
                     </div>
                     <div className="flex flex-col justify-start flex-grow">
                        {chatroom.isGroup ?
                           <h1 className="card-title text-sm"> {chatroom.roomName} </h1>

                           :
                           <h1 className="card-title text-sm">
                              <>
                                 {
                                    chatroom.members.filter((user) => user._id !== Auth.getProfile()._id)[0].username
                                 }
                              </>
                           </h1>

                        }
                        <p>

                           {chatroom.lastMessage.content}
                        </p>
                     </div>

                     <div className="justify-self-end">

                        {dayjs(chatroom.lastMessage.updatedAt).format(" h:mm a")}
                     </div>
                  </div>
               }
               <div className="avatar-group -space-x-6">

                  {
                     chatroom.members.length > 2 ?
                        chatroom.members.map((member: IUser, i: number) => {

                           return (
                              <div className="flex flex-col items-center justify-center" key={`chat${chatroom._id}member${member._id}`} data-user={member._id}>
                                 <h2 className={`text-error text-xs ${chatroom.admin._id === member._id ?
                                    "visible" : "invisible"}`}>Admin</h2>
                                 <div className="avatar  border-black border  ">
                                    <div className="w-6 rounded-full  bg-slate-300 ">
                                       <img src={member.avatar} className='' />
                                    </div>
                                 </div>

                                 <div className={`w-14 truncate p-1 text-xs ${i === 0 ? "visible" : "invisible"}`}>
                                    {member.username}
                                 </div>

                              </div>

                           )
                        }) :
                        null
                  }
               </div>

            </div>
         </div>
      </Link >
   )
}

export default ChatCard