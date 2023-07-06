import * as React from 'react';
import Login from '../../components/login'
export interface IHomeProps {
}

export default function Home() {
   return (
      <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col lg:flex-row">
            <div className="text-center lg:text-left">
               <h1 className="text-5xl font-bold">Login now!</h1>
               <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>

            <Login />
         </div>
      </div>
   );
}