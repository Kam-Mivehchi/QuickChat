import * as React from 'react';
import {
   useLoaderData,
   Link,
   useParams
} from "react-router-dom";
import { io } from "socket.io-client";
import Auth from "../../../utils/auth"
import { useSelector, useDispatch, } from 'react-redux'
import { ActionTypes, AppState } from "../../../utils/redux/reducers.tsx"
import { AppDispatch } from "../../../utils/redux/store.tsx";
import { sendMessage } from "../../../utils/api"
import ChatBubble from '../../../components/chatBubble.tsx'
import dayjs from 'dayjs';
import SingleChatHeader from '../../../components/singleChatHeader.tsx';
import ChatSettings from '../../../components/chatSettings.tsx';

export default function SingleChat() {
   let { chatId } = useParams();
   const dispatch = useDispatch<AppDispatch>()
   const data = useLoaderData() as IMessage[];
   const state = useSelector(state => state) as AppState

   const [socketConnected, setSocketConnected] = React.useState<boolean>(false);
   const [isTyping, setIsTyping] = React.useState<boolean>(false)
   const [newMessage, setNewMessage] = React.useState<string>("")
   const [modal, setModal] = React.useState<boolean>()
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
         <SingleChatHeader currentChat={state.currentChat} setModal={setModal} />
         {/* chatbox container */}
         < div className="  bg-base-200 relative overflow-hidden" >
            {/* settings */}
            <ChatSettings currentChat={state.currentChat} modal={modal} />

            <div className="card bg-base-100 shadow-xl w-full  py-2 h-[80vh] relative">
               <div className="absolute w-full"></div>
               <div className="overflow-auto">

                  {state.chatMessages.map((message: IMessage, i: number) => {
                     return (
                        <>
                           {/* line break for each day */}
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