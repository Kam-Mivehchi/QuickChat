import * as React from 'react';
import { Outlet, Link, useNavigation } from "react-router-dom";
import Auth from '../utils/auth';
import { Provider } from "react-redux";
import store from "../utils/redux/store";
import Navbar from '../components/navbar'
import { useEffect } from "react";

export default function Layout() {
   const navigation = useNavigation();

   return (
      <>
         <Provider store={store}>

            <div id="main">
               <header>
                  <Navbar />

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

         </Provider>
      </>
   );
}

