import React from 'react'
import {

   Link,

} from "react-router-dom";
interface PropType {
   roomName: string;
   members: IUser[],

}
function SingleChatHeader({ currentChat, setModal }: { currentChat: PropType, setModal: React.Dispatch<React.SetStateAction<boolean | undefined>> }) {
   return (
      <div className=" bg-base-200 flex items-center justify-between relative px-2">
         {/* back to chats */}
         <Link to="/chat" className="btn p-0"> &lt; Back</Link>
         {/* Name of group and members component */}
         <div className="flex flex-col items-center">
            <h2 className="btn">{currentChat.roomName}</h2>
            <div className="avatar-group -space-x-6">

               {currentChat.members.map((member, i) => {
                  if (i > 2) return;

                  return (
                     <Link className="flex flex-col items-center justify-center " to="">

                        <div className="avatar online border-black border  ">
                           <div className="w-10 rounded-full  bg-slate-300 ">
                              <img src={member.avatar} className='' />
                           </div>
                        </div>

                        <div className={`w-14 truncate p-1 ${i === 0 ? "visible" : "invisible"}`}>
                           {member.username}
                        </div>
                     </Link>
                  )
               })}
               {currentChat.members.length > 3 ?

                  <div className="avatar placeholder w-12 h-12">
                     <div className=" bg-neutral-focus text-neutral-content">
                        <span>+99</span>
                     </div>
                  </div>
                  : null}
            </div>
         </div>

         <div className="dropdown dropdown-bottom dropdown-end" >

            <label className="btn btn-circle swap swap-rotate" >

               <input type="checkbox" onClick={() => setModal(prev => !prev)} />

               {/* { Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. } */}
               <svg className="swap-off  w-5 mx-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>

               {/* close icon */}
               <svg className="swap-on " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

            </label>

         </div>
         {/* Open the modal using ID.showModal() method */}

      </div >
   )
}

export default SingleChatHeader