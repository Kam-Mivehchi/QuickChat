import * as React from 'react';
import {

   useLoaderData,
   useNavigate
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { ActionTypes, AppState } from "../../utils/redux/reducers.tsx"
import { io, Socket } from "socket.io-client";

import AllChatsHeader from '../../components/allChatsHeader.tsx';
import ChatCard from "../../components/chatCard.tsx";

import Auth from "../../utils/auth"
import { getAllChats } from '../../utils/api.tsx';
let socket: Socket;

export interface IChatProps {
}
//use data loaders https://reactrouter.com/en/main/start/tutorial

export default function Chat() {
   const dispatch = useDispatch()
   const state = useSelector(state => state) as AppState
   const data = useLoaderData() as IChatroom[];
   const [fetch, setFetch] = React.useState(false)
   const [socketConnected, setSocketConnected] = React.useState<boolean>(false);




   React.useEffect(() => {
      socket = io(import.meta.env.VITE_SOCKET_ENDPOINT);
      socket.emit("setup", Auth.getProfile());



      dispatch({ type: ActionTypes.SET_LOADING, loading: true });


      dispatch({ type: ActionTypes.SET_ALL_CHATS, chatroom: [...data] });
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });

      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: {} })


   }, []);

   React.useEffect(() => {
      socket.on("message-received", (newMessageReceived: IMessage) => {
         console.log(newMessageReceived)

         if (
            state.currentChat._id !== newMessageReceived.chatroom._id
         ) {
            dispatch({ type: ActionTypes.ADD_TO_UNREAD, message: newMessageReceived });
         }
         getChats()

      });

   }, []);

   async function getChats() {
      try {
         const chats = await getAllChats();
         dispatch({ type: ActionTypes.SET_ALL_CHATS, chatroom: [...chats] });
      } catch (error) {
         console.error(error);
      }
   }
   React.useEffect(() => {

   }, [])
   if (state.isLoading) {
      return <div className="loader">loading</div>

   }




   return (
      <div className='rounded-xl  '>

         <AllChatsHeader />
         <div className="flex flex-col gap-2 pt-2  overflow-auto lg:px-2 min-h-[75vh] ">

            {
               state.allChats.map((chatroom: IChatroom) => {

                  return (<ChatCard chatroom={chatroom} key={chatroom._id} />)
               })
            }
         </div>


      </div >
   );
}
