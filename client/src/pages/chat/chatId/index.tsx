import * as React from 'react';
import {
   useLoaderData,
   Link,
   useParams
} from "react-router-dom";
import { io, Socket } from "socket.io-client";
import Auth from "../../../utils/auth"
import { useSelector, useDispatch, } from 'react-redux'
import { ActionTypes, AppState } from "../../../utils/redux/reducers.tsx"
import { AppDispatch } from "../../../utils/redux/store.tsx";
import { sendMessage } from "../../../utils/api"
import ChatBubble from '../../../components/chatBubble.tsx'
import dayjs from 'dayjs';


export default function SingleChat() {
   let { chatId } = useParams();
   const dispatch = useDispatch<AppDispatch>()
   const data = useLoaderData() as IMessage[];
   const state = useSelector(state => state) as AppState

   const [socketConnected, setSocketConnected] = React.useState<boolean>(false);
   const [isTyping, setIsTyping] = React.useState<boolean>(false)
   const [newMessage, setNewMessage] = React.useState<string>("")
   const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

   const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };
   let socket = io(import.meta.env.VITE_SOCKET_ENDPOINT);

   React.useEffect(() => {
      scrollToBottom();
   }, [state.chatMessages]);

   React.useEffect(() => {
      socket.emit("setup", Auth.getProfile());
      socket.on("connected", () => setSocketConnected(true));
      socket.emit("join-chat", chatId);

      socket.on("typing", () => setIsTyping(true));
      socket.on("stop-typing", () => setIsTyping(false));

      dispatch({ type: ActionTypes.SET_LOADING, loading: true });
      dispatch({ type: ActionTypes.SET_MESSAGES, messages: [...data] });
      dispatch({ type: ActionTypes.SET_CURRENT_CHAT, chatroom: data[0].chatroom });
      dispatch({ type: ActionTypes.SET_LOADING, loading: false });

      // socket.emit("join-chat", chatId);

      return (): void => {
         dispatch({ type: ActionTypes.SET_MESSAGES, messages: [] })
         dispatch({ type: ActionTypes.SET_ERROR, error: false });

      };
   }, [])


   React.useEffect(() => {
      socket.on("message-received", (newMessageReceived: IMessage) => {
         console.log({ newMessageReceived })
         if (
            chatId !== newMessageReceived.chatroom._id
         ) {
            // notification
            if (!state.unread.includes(newMessageReceived)) {
               // setUnread([newMessageReceived, ...notification]);
               dispatch({ type: ActionTypes.ADD_TO_UNREAD, message: newMessageReceived });
            }
         } else {
            dispatch({ type: ActionTypes.ADD_NEW_MESSAGE, message: newMessageReceived });

         }
      });
   });
   async function handleSendMessage(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault()
      if (!newMessage) return;
      try {
         socket.emit("stop-typing", chatId);
         const response = await sendMessage({ chatroom: chatId as string, content: newMessage })

         socket.emit("new-message", response);
         console.log(socket)
         dispatch({ type: ActionTypes.ADD_NEW_MESSAGE, message: response });
         setNewMessage("")
      } catch (error) {
         dispatch({ type: ActionTypes.SET_ERROR, error: true });
      }
   }
   async function handleTyping(event: React.ChangeEvent<HTMLInputElement>) {
      if (!socketConnected) return;

      if (!isTyping) {

         socket.emit("typing", chatId);
         setIsTyping(true);
      }
      var DELAY = 2000;
      setTimeout(() => {

         socket.emit("stop-typing", chatId);
         setIsTyping(false);

      }, DELAY);
      setNewMessage(event.target.value)
   }
   if (state.isLoading) {
      return <div className="loader">loading</div>

   }
   return (
      <>
         {/* chat header */}
         <div className=" bg-base-200 flex items-center justify-between relative pxgi-2">
            {/* back to chats */}
            <Link to="/chat" className="btn p-0"> &lt; Back</Link>
            {/* Name of group and members component */}
            <div className="flex flex-col items-center">
               <h2 className="btn">{state.currentChat.roomName}</h2>
               <div className="avatar-group -space-x-6">

                  {state.currentChat.members.map((member, i) => {
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
                  {state.currentChat.members.length > 3 ?

                     <div className="avatar placeholder w-12 h-12">
                        <div className=" bg-neutral-focus text-neutral-content">
                           <span>+99</span>
                        </div>
                     </div>
                     : null}
               </div>
            </div>

            <label className="btn btn-circle swap swap-rotate">

               {/* this hidden checkbox controls the state */}
               <input type="checkbox" />

               {/* hamburger icon
          

               {/* { Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. } */}

               <svg className="swap-off  w-5 mx-auto fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>

               {/* close icon */}
               <svg className="swap-on " xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" /></svg>

            </label>
         </div >
         {/* chatbox container */}
         < div className="  bg-base-200 " >
            <div className="card bg-base-100 shadow-xl w-full  py-2 h-[80vh] relative">
               <div className="absolute w-full"></div>
               <div className="overflow-auto">

                  {state.chatMessages.map((message: IMessage, i: number) => {
                     return (
                        <>
                           {dayjs(message.createdAt).format("MMM D") !== dayjs(state.chatMessages[i ? i - 1 : 0].createdAt).format("MMM D") ?
                              <div className="flex flex-col w-full border-opacity-50 p-5">

                                 <div className="divider">{dayjs(message.createdAt).format("MMM D")}</div>

                              </div>
                              :
                              null}
                           <ChatBubble message={message} key={message._id} />
                        </>
                     )
                  })}

                  <div className={`chat chat-start pl-10 ${isTyping ? "grid" : "hidden"}`} >
                     <div className=" chat-bubble flex "><span className="loading loading-dots loading-xs "></span></div>
                  </div>
                  <div ref={messagesEndRef}></div>
               </div>
               <form className=" flex justify-center" onSubmit={handleSendMessage}>

                  <input type="text" placeholder="send a message" className="input input-bordered max-w-xs " onChange={handleTyping} value={newMessage} />

                  <button type="submit" className="btn btn-primary w-16">Send</button>
               </form>
            </div>
            {/* Message input */}
         </div >
      </>
   );
}