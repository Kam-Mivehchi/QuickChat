import * as React from 'react';
import Login from '../../components/login'
import { TypeAnimation } from 'react-type-animation';

export default function Home() {
   return (
      <div className="hero min-h-screen ">
         <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
               <h1 className="text-5xl font-bold">Connect With</h1>

               <TypeAnimation
                  className="text-5xl font-bold"
                  sequence={['Friends', 1000, 'Family', 1000, 'Neighbors', 1000, 'Colleagues', 1000, 'Employees', 1000]}
                  repeat={Infinity}
                  wrapper="h1"
               />
               <p className="py-6">Quickchat connects the world through instant message. Easy to use platform, so you can connect to your loved ones hassle free</p>
            </div>

            <Login />
         </div>
      </div>
   );
}