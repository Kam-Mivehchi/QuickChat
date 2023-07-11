import * as React from 'react';

import { login, register } from '../utils/api';
import Auth from '../utils/auth';
export interface IAuthenticationProps {
}
import { useSelector, useDispatch, } from 'react-redux'
import { ActionTypes, AppState } from "../utils/redux/reducers.tsx"
import { AppDispatch } from "../utils/redux/store.tsx";
import { setInterval } from 'timers/promises';

export default function Login() {
   const [formState, setFormState] = React.useState({ email: '', password: '', username: '' });
   const [confirm, setConfirm] = React.useState<string>("");
   const dispatch = useDispatch<AppDispatch>()
   const state = useSelector(state => state) as AppState
   const [registration, setRegistration] = React.useState<boolean>(false)
   const [spin, setSpin] = React.useState<boolean>(false)

   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {



         dispatch({ type: ActionTypes.SET_LOADING, loading: true });

         const { token, user } = registration ? await register(formState) : await login({ email: formState.email, password: formState.password })

         Auth.login(token);

         dispatch({ type: ActionTypes.SET_CURRENT_USER, user: user });
         dispatch({ type: ActionTypes.SET_LOADING, loading: false });


      } catch (e) {

         dispatch({ type: ActionTypes.SET_ERROR, error: !!e });
         dispatch({ type: ActionTypes.SET_LOADING, loading: false });

      }
   };
   React.useEffect(() => {
      setTimeout(() => {
         setSpin(false)

      }, 501)
   }, [spin])

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setFormState({
         ...formState,
         [name]: value,
      });
   };
   return (
      <form className={`card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ${spin ? "animate-spinOnce" : "animate-none"} `} onSubmit={handleFormSubmit} >
         <div className="card-body">
            <h2 className="card-title self-center">{registration ? "Create an Account" : "Login"}</h2>


            <div className="form-control">
               <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
               </label>
               <input
                  className="input input-bordered"
                  placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
               />
            </div>
            <div className="form-control">
               <label className="label" htmlFor="pwd">
                  <span className="label-text">Password</span>
                  <span className="label-text-alt">8 characters min</span>
               </label>
               <input
                  className="input input-bordered"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
               />
            </div>

            {registration ?
               <>
                  <div className="form-control">
                     <label className="label" htmlFor="pwd">
                        <span className="label-text">Confirm Password</span>
                     </label>
                     <input
                        className="input input-bordered"
                        placeholder="******"
                        name="password"
                        type="password"
                        id="pwd"
                        onChange={(e) => setConfirm(e.target.value)}
                     />
                  </div>
                  <div className="form-control">
                     <label className="label" htmlFor="username">
                        <span className="label-text">Username</span>
                     </label>
                     <input
                        className="input input-bordered"
                        placeholder="quick_chat_fanatic_32"
                        name="username"
                        type="text"
                        id="username"
                        onChange={handleChange}
                     />
                  </div>
               </>
               : null}

            <label className="label flex justify-center gap-2 ">
               <span>
                  {registration ? "Returning User?" : "Need an Account?"}
               </span>
               <div onClick={() => {
                  setRegistration(prev => !prev)
                  setSpin(true)
               }} className=" link link-secondary link-hover p-0 underline">{registration ? "Register" : "Login"}</div>
            </label>
            {state.isError ? (
               <div>
                  <p className="text-error">The provided credentials are incorrect</p>
               </div>
            ) : null}
            <div className="form-control ">
               <button className={`btn  btn-primary ${!registration ? "inline-flex" : "hidden"}`} type="submit">{state.isLoading ? <span className="loading loading-dots loading-md animate-pulse"></span>
                  : "Login"}</button>

               <button className={`btn ${registration ? "inline-flex" : "hidden"} ${confirm === formState.password && formState.password ? "btn-primary" : "btn-disabled"}`} type="submit">{state.isLoading ? <span className="loading loading-dots loading-md animate-pulse"></span>
                  : "Register"}</button>
            </div>
         </div>
      </form>
   );
}
