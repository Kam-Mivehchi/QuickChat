import React from 'react'
import {
   Link,
   useNavigate
} from "react-router-dom";
import dayjs from "dayjs"
import Auth from "../utils/auth"
import { useDispatch, useSelector } from 'react-redux'
import { ActionTypes, AppState } from "../utils/redux/reducers.tsx"
import { AppDispatch } from "../utils/redux/store.tsx";
let unreadMessages = [];


function ChatCard({ chatroom }: { chatroom: IChatroom }) {
   const dispatch = useDispatch<AppDispatch>()
   const state = useSelector(state => state) as AppState
   const navigate = useNavigate()


   function handleChatClick() {
      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: chatroom })
      dispatch({ type: ActionTypes.REMOVE_FROM_UNREAD, chatroom: chatroom })
      navigate(`/chat/${chatroom._id}`)
   }


   return (
      <a onClick={handleChatClick} >

         <div key={`${chatroom._id}`} className="  card bg-base-100 shadow-xl border " >
            <div className="card-body p-2 relative">
               <div className="flex flex-row items-center justify-start gap-2">

                  <span className={`badge badge-primary badge-xs h-3 ${state.unread.filter((message: IMessage) => {
                     console.log(message.chatroom._id, chatroom._id)
                     return message.chatroom._id == chatroom._id
                  }).length ? "visible" : "invisible"}`}>
                  </span>

                  <div className=" flex flex-col items-center ">

                     <div className="avatar">
                        <div className="w-8 bg-slate-300 rounded-full">
                           {chatroom.isGroup ?

                              <div className="w-full text-center p-0 flex justify-center h-full items-center text-xs font-bold">
                                 GM
                              </div>

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
                  <div className="flex flex-col flex-grow overflow-hidden  ">
                     {/* chat name */}
                     <h1 className="card-title text-sm truncate   w-full">
                        <>
                           {
                              chatroom.isGroup ?
                                 chatroom.roomName
                                 : chatroom.members.filter((user) => user._id !== Auth.getProfile()._id)[0].username
                           }
                        </>
                     </h1>
                     <p className="justify-self-end">

                        {/* {state.unread.length ? <span className="indicator-item badge badge-secondary">new</span> : null} */}
                        {chatroom.lastMessage
                           ?
                           chatroom.lastMessage.content
                           :
                           "No Messages"}


                     </p>
                  </div>

                  <div className="min-w-max justify-self-end ">

                     {dayjs(chatroom.updatedAt).format(" h:mm a")}
                  </div>

               </div>


               <div className="avatar-group -space-x-6 pl-2 overflow-x-scroll">

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
      </a >
   )
}

export default ChatCard