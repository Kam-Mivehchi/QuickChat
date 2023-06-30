import { Outlet, Link, useNavigation } from "react-router-dom";

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
                  <Link to={`/login`}>Login</Link>
                  <Link to={`/register`}>Register</Link>
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