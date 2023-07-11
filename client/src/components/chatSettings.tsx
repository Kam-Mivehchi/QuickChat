
import {
   useParams,
   Link,

} from "react-router-dom";
import { removeMemberFromChat } from '../utils/api'
interface PropType {
   roomName: string;
   members: IUser[],
   admin: IUser

}
import UserSearchBar from './userSearchBar';
import { useDispatch, } from 'react-redux'
import { ActionTypes } from "../utils/redux/reducers.tsx"

function ChatSettings({ currentChat, modal }: { currentChat: PropType, modal: boolean | undefined }) {

   const { chatId } = useParams()
   const dispatch = useDispatch()

   async function removeGroupMember(userId: string) {
      try {
         let removeMember = await removeMemberFromChat({ params: { chatId: chatId }, members: [userId] })

         dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: removeMember });
      } catch (error) {
         console.error(error)
      }
   }
   return (
      <div className={`card border absolute z-20 bg-base-200 w-full h-full gap-4 p-4 overflow-auto     transition-transform duration-200 ease-in ${modal ? "translate-x-0" : "translate-x-full"} `}>

         <div className="card  relative " >
            <div className="divider">

               <h3 className="card-title">Chat Members</h3>
            </div>
            <div className="bg-base-100 rounded-2xl ">
               <div className="card  " tabIndex={0}>
                  {/* <div className="w-8 h-8 grid place-content-center rounded-full  btn btn-primary  btn-sm p-0" onClick={() => setToggleSearch(true)}>
                     +
                  </div> */}
                  <UserSearchBar page={"singleChat"} />

               </div>
               {currentChat.members.map(member => {
                  return (
                     <div className="  grid-cols-max grid-flow-col border-y rounded-none " key={member._id} tabIndex={0}>

                        <Link className=" flex gap-2  collapse-title text-xl font-medium" to={`/user/${member._id}`} key={member._id}>
                           <div className="avatar">
                              <div className="w-8 bg-slate-300 rounded-full ">
                                 <img src={member.avatar} alt={`${member.avatar} avatar image`} />
                              </div>
                           </div>
                           <h1 className="card-title flex-grow">

                              {member.username}
                           </h1>

                        </Link>

                        <div className=" flex   gap-2 px-4 pb-3">
                           <Link to={`/user/${member._id}`} tabIndex={0} className="btn btn-primary btn-sm ">
                              Profile
                           </Link>
                           <button className="btn  btn-error btn-sm " tabIndex={0} onClick={() => removeGroupMember(member._id)}>
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

               <Link className=" flex gap-2  collapse-title text-xl font-medium" to={`/user/${currentChat.admin._id}`} key={currentChat.admin._id}>
                  <div className="avatar">
                     <div className="w-8 bg-slate-300 rounded-full ">
                        <img src={currentChat.admin.avatar} alt={`${currentChat.admin.username} avatar image`} />
                     </div>
                  </div>
                  <h1 className="card-title flex-grow">

                     {currentChat.admin.username}
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
                  <Link to={`/user/${currentChat.admin._id}`} tabIndex={0} className="btn btn-primary btn-sm flex-grow">
                     Profile
                  </Link>
                  <button tabIndex={0} className="btn  btn-error btn-sm flex-grow">
                     Change Admin
                  </button>
               </div>

            </div>
         </div>
      </div>
   )
}

export default ChatSettings