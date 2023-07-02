import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import Layout from "./layout/index";
import ErrorPage from "./pages/error";
import ChatDash from "./pages/chat";
import SingleChat from "./pages/chat/chatId/index";
import AllChats from './pages/chat/allChats'

import Home from "./pages/home";
import Profile from "./pages/profile";
import { allChatLoader, chatMessagesLoader } from './utils/loaders';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import './index.css'
import Auth from "./utils/auth"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: Auth.loggedIn() ? <Navigate to="/chat" /> : <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "chat",
        element: Auth.loggedIn() ? <ChatDash /> : <Navigate to="/" />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "/chat/",
            element: Auth.loggedIn() ? <AllChats /> : <Navigate to="/" />,
            loader: allChatLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "/chat/:chatId",
            element: Auth.loggedIn() ? <SingleChat /> : <Navigate to="/" />,
            loader: chatMessagesLoader,
            errorElement: <ErrorPage />,
          },

        ]
      },
      {
        path: "user/:userId",
        element: Auth.loggedIn() ? <Profile /> : <Navigate to="/" />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
