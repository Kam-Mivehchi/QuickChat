
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../utils/redux/store";
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';

export default function Layout() {


   return (
      <>
         <Helmet>
            <title>QuickChat</title>
         </Helmet>
         <Provider store={store}>

            <div id="main" className={`bg-customGradient animate-gradientFlow bg-[size:400%_400%] pt-2 min-h-screen`}>
               <header>
                  <Navbar />

               </header>

               <main

                  className={`mt-2 `}
               >

                  <Outlet />
               </main>

               <footer>

               </footer>
            </div>

         </Provider>
      </>
   );
}

