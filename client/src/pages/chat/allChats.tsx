import * as React from 'react';
import {

   useLoaderData,
   Link,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes, AppState } from "../../utils/redux/reducers.tsx"
import dayjs from "dayjs"
import Auth from "../../utils/auth"
import AllChatsHeader from '../../components/allChatsHeader.tsx';
import ChatCard from "../../components/chatCard.tsx";
export interface IChatProps {
}
//use data loaders https://reactrouter.com/en/main/start/tutorial

export default function Chat(props: IChatProps) {
   const dispatch = useDispatch()
   const state = useSelector(state => state) as AppState
   const data = useLoaderData() as IChatroom[];

   console.log(data)

   React.useEffect(() => {
      dispatch({ type: ActionTypes.SET_LOADING, loading: true });


      dispatch({ type: ActionTypes.SET_ALL_CHATS, chatroom: [...data] });
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });

      console.log(state.allChats)
   }, [])
   if (state.isLoading) {
      return <div className="loader">loading</div>

   }
   return (
      <div>

         <AllChatsHeader />

         {
            state.allChats.map((chatroom: IChatroom) => {
               // console.log(chatroom.lastMessage?.sender)
               return (<ChatCard chatroom={chatroom} />)
            })
         }
         {/* new chat button*/}
         {/* going to be a list of all chats */}
         {/* current chat on big screen*/}
         {/* current chat is its own page on small screen*/}

      </div >
   );
}
