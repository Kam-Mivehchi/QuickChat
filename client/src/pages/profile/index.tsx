import * as React from 'react';
import {
   useLoaderData,
   useParams,
   useNavigate,
} from "react-router-dom";
import { createDM, updateUser } from '../../utils/api'
import { ActionTypes } from "../../utils/redux/reducers.tsx"
import { useDispatch, } from 'react-redux'

import Auth from "../../utils/auth";

export interface IProfileProps {
}

export default function Profile(props: IProfileProps) {
   const { userId } = useParams()
   const data = useLoaderData() as IUser;
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [bio, setBio] = React.useState<string | undefined>(data.bio)


   async function updateBio(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault()
      try {
         console.log()
         const updated = await updateUser(userId as string, { bio: e.target.value })

         setBio(updated.bio)
      } catch (error) {
         console.error(error)
      }
   }

   async function handleNewDM() {

      try {
         let newDM = await createDM(userId as string)
         dispatch({ type: ActionTypes.ADD_TO_ALL_CHATS, chatroom: newDM });
         dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: newDM });
         console.log(newDM)
         navigate(`/chat/${newDM._id}`);

      } catch (error) {
         console.error(error)
      }
   }
   return (
      <div className='card flex-col items-center bg-base-200 gap-0  p-6 h-[calc(100vh-5em)] justify-center'>
         <div className="flex flex-col items-center">

            <div className="avatar">
               <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={data.avatar} />
               </div>
            </div>
            <div className="card-body items-center">
               <h2 className='card-title'>{data.username}</h2>

               <div className="flex items-center">{userId === Auth.getProfile()._id ?
                  <>

                     <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                     <input type="text" className=' input input-ghost' onChange={updateBio} defaultValue={bio} />
                  </>
                  : bio}</div>

               <button className="btn btn-primary w-full" onClick={handleNewDM}>Send Message</button>
            </div>
         </div>

      </div>
   );
}