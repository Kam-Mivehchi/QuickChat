import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import Layout from "./layout/index";
import ErrorPage from "./pages/error";
import Chat from "./pages/chat";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Login from "./pages/home/login";
import Register from "./pages/home/register";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "chat",
        element: <Chat />,
        children: [
          {
            path: "/chat/:chatId",
            element: <Home />,
          },
        ]
      },
      {
        path: "user/:userId",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
