import * as React from 'react';
import {

   useLoaderData,
   Link,
} from "react-router-dom";

export interface IChatProps {
}
//use data loaders https://reactrouter.com/en/main/start/tutorial

export default function Chat(props: IChatProps) {
   const data = useLoaderData() as IChatroom[];
   console.log(data)
   return (
      <div>
         All Chats
         {
            data.map((chatroom: IChatroom,) => {

               return (
                  <Link to={`/chat/${chatroom._id}`}>

                     <div key={`${chatroom._id}`} className="border-4 border-black" >
                        <h1 className="h1">{chatroom.roomName}</h1>
                        <p className="">Update {chatroom.updatedAt}</p>
                        <p className="">Created {chatroom.createdAt}</p>
                        <p className="">Group {chatroom.isGroup ? "true" : "false"}</p>
                        <p className="">{chatroom.roomName}</p>
                        {/* 
                  <div className="admin border-2" data-user={chatroom.admin._id}>
                     <img src={chatroom.admin.avatar} alt={`${chatroom.admin.username} avatar image`} />
                     <h3 className="text-xl">{chatroom.admin.username}</h3>
                  </div> */}

                        {!chatroom.lastMessage
                           ?
                           <div className="lastMessage border-2" >
                              No Messages found
                           </div>
                           :

                           <div className="lastMessage border-2" data-message={chatroom.lastMessage._id} >

                              <img src={chatroom.lastMessage.sender.avatar} alt={`${chatroom.lastMessage.sender.avatar} avatar image`} />
                              <p>

                                 {chatroom.lastMessage.sender.username}
                              </p>
                              <p>

                                 {chatroom.lastMessage.content}
                              </p>
                              <p>

                                 {chatroom.lastMessage.createdAt}
                              </p>
                           </div>
                        }
                        {
                           chatroom.members.map((member: IUser) => {
                              return (
                                 <div className="" key={`chat${chatroom._id}member${member._id}`} data-user={member._id}>{member.username}
                                    <img src={member.avatar} alt="" className="w-8" />
                                    {chatroom.admin._id === member._id ?
                                       <h2 className="text-error">Admin</h2>
                                       : null}
                                 </div>

                              )
                           })
                        }

                     </div>
                  </Link>)
            })
         }
         {/* new chat button*/}
         {/* going to be a list of all chats */}
         {/* current chat on big screen*/}
         {/* current chat is its own page on small screen*/}

      </div >
   );
}
