// use this to decode a token and get the user's information out of it
import decode, { JwtPayload } from 'jwt-decode';



export interface UserPayload extends JwtPayload {
   _id: string;
   username: string;
   email: string;
}
// create a new class to instantiate for a user
class AuthService {
   // get user data
   getProfile(): UserPayload {
      return decode(this.getToken());
   }

   // check if user's logged in
   loggedIn(): boolean {
      // Checks if there is a saved token and it's still valid
      const token: string = this.getToken();
      return !!token && !this.isTokenExpired(token); // handwaiving here
   }

   // check if token is expired
   isTokenExpired(token: string): boolean {
      try {
         const decoded: UserPayload = decode(token);

         if (decoded!.exp! < Date.now() / 1000) {
            return true;
         } else return false;
      } catch (err) {
         return false;
      }
   }

   getToken(): string {
      // Retrieves the user token from localStorage
      return localStorage.getItem('id_token') || "";
   }

   login(idToken: string): void {
      // Saves user token to localStorage
      localStorage.setItem('id_token', idToken);
      window.location.assign('/');
   }

   logout(): void {
      // Clear user token and profile data from localStorage
      localStorage.removeItem('id_token');
      // this will reload the page and reset the state of the application
      window.location.assign('/');
   }
}

export default new AuthService();