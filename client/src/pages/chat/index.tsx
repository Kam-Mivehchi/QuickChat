import * as React from 'react';
import {

   useLoaderData,
   Link,
   Outlet
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from '../../utils/redux/store'
export interface IChatProps {
}
//use data loaders https://reactrouter.com/en/main/start/tutorial

export default function ChatDash(props: IChatProps) {

   return (
      <Provider store={store}>

         {/* new chat button*/}
         {/* going to be a list of all chats */}
         {/* current chat on big screen*/}
         {/* current chat is its own page on small screen*/}
         <Outlet />
      </Provider>

   );
}
