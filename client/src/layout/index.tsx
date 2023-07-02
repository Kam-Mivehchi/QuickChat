import { Outlet, Link, useNavigation } from "react-router-dom";
import Auth from '../utils/auth';
export default function Layout() {
   const navigation = useNavigation();
   return (
      <>
         <div id="main">
            <header>

               <h1>Navbar</h1>
               <nav>
                  <Link to={`/`}>Home</Link>
                  <Link to={`/chat`}>Chat</Link>
                  <button className={`btn btn-error ${Auth.loggedIn() ? "inline-block" : "hidden"}`} onClick={() => Auth.logout()}>Sign Out</button>
               </nav>
            </header>

            <main

               className={
                  navigation.state === "loading" ? "loading" : ""
               }
            >
               <Outlet />
            </main>

            <footer>

            </footer>
         </div>

      </>
   );
}