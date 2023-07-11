import * as React from 'react'
import { Link } from "react-router-dom";
import Auth from '../utils/auth';
import { useSelector } from 'react-redux'
import { AppState } from '../utils/redux/reducers'
import { getSingleUser } from '../utils/api';
import { FaInbox, FaSignOutAlt } from "react-icons/fa";
import { BsFillChatRightQuoteFill } from "react-icons/bs";
function Navbar() {
   const state = useSelector(state => state) as AppState;

   const [avatar, setAvatar] = React.useState<string>("")
   React.useEffect(() => {
      async function getUser() {
         if (!Auth.loggedIn()) return
         try {
            let user = await getSingleUser({ params: { userId: Auth.getProfile()._id } })
            setAvatar(user.avatar as string)

         } catch (error) {
            console.error(error);
         }
      }
      getUser()
   }, [])
   return (
      <>
         <nav className="navbar  max-w-6xl mx-auto bg-base-100 px-4 rounded-full ">
            <div className="navbar-start">
               <div className="dropdown ">
                  <label tabIndex={0} className="btn btn-ghost lg:hidden indicator btn-sm p-0 w-">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                     </svg>
                     <span className={`indicator-item  badge badge-primary badge-xs pt-0 ${state.unread.length ? "absolute" : "hidden"}`}>{state.unread.length}</span>
                  </label>
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 relative indicator">

                     <span className={`indicator-item  badge badge-primary badge-xs pt-0 ${state.unread.length ? "absolute" : "hidden"}`}>{state.unread.length}</span>

                     <Link to={`/chat`} className="flex gap-2 items-center font-bold">
                        <FaInbox />
                        Inbox</Link>
                  </ul>
               </div>
               <Link to={`/chat`} className="btn btn-ghost normal-case text-xl flex items-center text-primary">
                  <BsFillChatRightQuoteFill size=".75em" className="fill-primary-focus" />
                  QuickChat</Link>
            </div>
            <div className={` hidden lg:flex ${Auth.loggedIn() ? "navbar-center" : "navbar-end"}`}>
               <ul className="menu menu-horizontal px-1">
                  <li className="indicator">
                     <span className={`indicator-item badge badge-secondary pt-0 ${state.unread.length ? "absolute" : "hidden"}`}>{state.unread.length}</span>
                     <Link to={`/chat`} className="font-bold text-xl btn btn-primary btn-sm items-center hover:bg-primary-focus flex py-0">

                        <FaInbox />
                        Inbox
                     </Link>

                  </li>
               </ul>
            </div>
            <div className={`navbar-end flex gap-2 ${Auth.loggedIn() ? "flex" : "hidden"}`}>
               <Link className={`${Auth.loggedIn() ? "avatar" : "hidden"} `} to={`${Auth.loggedIn() ? `user/${Auth.getProfile()._id}` : "/"}`}>
                  <div className="w-12 rounded-full border-2 shadow-lg border-primary">
                     <img src={avatar} alt="asdfsd" className={`${Auth.loggedIn() ? "inline-block" : "hidden"}`} />
                  </div>
               </Link>
               <button className={`btn btn-xs btn-error flex items-center ${Auth.loggedIn() ? "inline-block" : "hidden"}`} onClick={() => Auth.logout()}>
                  <FaSignOutAlt />
                  Sign Out</button>
            </div>
         </nav>
         <Toast />
      </>
   )
}

export default Navbar

function Toast() {
   const state = useSelector(state => state) as AppState;

   return (
      <div className={`toast toast-top w-full z-40 p-0 animate-slideThrough translate-x-[-1000%] ${state.unread.length ? "toast" : "hidden"}`}>
         <div className="alert alert-info">
            <span>New Message</span>
         </div>

      </div>
   )

}