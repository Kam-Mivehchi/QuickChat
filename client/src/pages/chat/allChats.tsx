import * as React from 'react';
import {

   useLoaderData,

} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes, AppState } from "../../utils/redux/reducers.tsx"

import AllChatsHeader from '../../components/allChatsHeader.tsx';
import ChatCard from "../../components/chatCard.tsx";
export interface IChatProps {
}
//use data loaders https://reactrouter.com/en/main/start/tutorial

export default function Chat() {
   const dispatch = useDispatch()
   const state = useSelector(state => state) as AppState
   const data = useLoaderData() as IChatroom[];



   React.useEffect(() => {
      dispatch({ type: ActionTypes.SET_LOADING, loading: true });


      dispatch({ type: ActionTypes.SET_ALL_CHATS, chatroom: [...data] });
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });

      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: {} })
   }, [])
   if (state.isLoading) {
      return <div className="loader">loading</div>

   }
   return (
      <div className='overflow-hidden'>

         <AllChatsHeader />
         <div className="flex flex-col gap-2 pt-2  overflow-auto">

            {
               state.allChats.map((chatroom: IChatroom) => {

                  return (<ChatCard chatroom={chatroom} key={chatroom._id} />)
               })
            }
         </div>


      </div >
   );
}
