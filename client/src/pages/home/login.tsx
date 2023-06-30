import * as react from 'react';
import axios from 'axios';
import useApi from '../../utils/hooks';
import Auth from '../../utils/auth';
export interface IAuthenticationProps {
}

export default function Login(props: IAuthenticationProps) {
   const [formState, setFormState] = react.useState({ email: '', password: '' });
   const [error, setError] = react.useState(false)
   const [loading, setLoading] = react.useState(false)

   const baseURL = "http://localhost:3001/api"
   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
         // const mutationResponse = await login({
         //    variables: { email: formState.email, password: formState.password },
         // });
         console.log("workin")
         setLoading(true)
         // const token = mutationResponse.data.login.token;
         const response = await axios({
            method: "post", //you can set what request you want to be
            url: baseURL + '/users/login',
            data: formState
         })


         Auth.login(response.data.token);
         setLoading(false)

      } catch (e) {
         console.log(e);
         setLoading(false)
         setError(!!e)

      }
   };

   const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target;
      setFormState({
         ...formState,
         [name]: value,
      });
   };
   return (
      <form className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100" onSubmit={handleFormSubmit}>
         <div className="card-body">
            <h1 className="h1">{formState.email}</h1>
            <h1 className="h1">{formState.password}</h1>
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
               </label>
               <input
                  className="input input-bordered"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
               />
               <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
               </label>
            </div>
            {error ? (
               <div>
                  <p className="text-error">The provided credentials are incorrect</p>
               </div>
            ) : null}
            <div className="form-control mt-6">
               <button className="btn btn-primary" type="submit">{loading ? <span className="loading loading-dots loading-md animate-pulse"></span>
                  : "Login"}</button>
            </div>
         </div>
      </form>
   );
}
