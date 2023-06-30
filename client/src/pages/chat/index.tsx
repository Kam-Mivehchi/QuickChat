import * as React from 'react';
import {

   useLoaderData,
   Link,
   Outlet
} from "react-router-dom";

export interface IChatProps {
}
//use data loaders https://reactrouter.com/en/main/start/tutorial

export default function ChatDash(props: IChatProps) {

   return (
      <div>
         CHAT Dash
         <Outlet />
         {/* new chat button*/}
         {/* going to be a list of all chats */}
         {/* current chat on big screen*/}
         {/* current chat is its own page on small screen*/}
      </div >
   );
}
