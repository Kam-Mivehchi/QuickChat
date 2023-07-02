import React from 'react'
import {

   Link,

} from "react-router-dom";
interface PropType {
   roomName: string;
   members: IUser[],
   admin: string

}
function ChatSettings({ currentChat, modal }: { currentChat: PropType, modal: boolean | undefined }) {
   return (
      <div className={`card border absolute z-20 bg-base-200 w-full h-full gap-4 p-4 overflow-auto    transition-transform duration-200 ease-in ${modal ? "translate-x-0" : "translate-x-full"}`}>

         <div className="card  ">
            <div className="divider">

               <h3 className="card-title">Chat Members</h3>
            </div>
            <div className="bg-base-100 rounded-2xl ">
               <div className="card flex-row gap-2 px-4 py-2" tabIndex={0}>
                  <div className="w-8 h-8 grid place-content-center rounded-full  btn btn-primary  btn-sm p-0">
                     +
                  </div>
                  <div className="card-title text-primary">

                     Add
                  </div>
               </div>
               {currentChat.members.map(member => {
                  return (
                     <div className=" collapse grid-cols-max grid-flow-col border-y rounded-none " tabIndex={0}>

                        <Link className=" flex gap-2  collapse-title text-xl font-medium" to="" key={member._id}>
                           <div className="avatar">
                              <div className="w-8 bg-slate-300 rounded-full ">
                                 <img src={member.avatar} alt={`${member.avatar} avatar image`} />
                              </div>
                           </div>
                           <h1 className="card-title flex-grow">

                              {member.username}
                           </h1>

                        </Link>
                        <div className="justify-self-end">
                           <label className="btn m-1 btn-ghost ">

                              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
                                 {/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.  */}
                                 <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                           </label>

                        </div>
                        <div className="collapse-content flex justify-between w-full gap-2">
                           <Link to="" tabIndex={0} className="btn btn-primary btn-sm flex-grow">
                              Profile
                           </Link>
                           <button className="btn  btn-error btn-sm flex-grow">
                              Remove Member
                           </button>
                        </div>

                     </div>
                  )
               })}



            </div>
         </div>
         <div className="card">

            <div className="divider ">

               <h3 className="card-title ">Admin</h3>
            </div>
            <div className=" collapse grid-cols-max grid-flow-col border-y rounded-none " tabIndex={0}>

               <Link className=" flex gap-2  collapse-title text-xl font-medium" to="" key={currentChat.admin}>
                  <div className="avatar">
                     <div className="w-8 bg-slate-300 rounded-full ">
                        <img src={currentChat.admin} alt={`${currentChat.admin} avatar image`} />
                     </div>
                  </div>
                  <h1 className="card-title flex-grow">

                     {currentChat.admin}
                  </h1>

               </Link>
               <div className="justify-self-end">
                  <label className="btn m-1 btn-ghost ">

                     <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 128 512">
                        {/* Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.  */}
                        <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                  </label>

               </div>
               <div className="collapse-content flex justify-between w-full gap-2">
                  <Link to="" tabIndex={0} className="btn btn-primary btn-sm flex-grow">
                     Profile
                  </Link>
                  <button className="btn  btn-error btn-sm flex-grow">
                     Remove Member
                  </button>
               </div>

            </div>
         </div>
      </div>
   )
}

export default ChatSettings