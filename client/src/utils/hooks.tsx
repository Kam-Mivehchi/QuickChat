import { useState, useEffect } from 'react';
import axios from 'axios';

interface CustomAPIHook {
   data: object | null;
   isLoading: boolean;
   error: string | null;
}

const useApi = (method: "get" | "put" | "post" | "delete", endpoint: string, token?: string, body?: object): CustomAPIHook => {

   const [data, setData] = useState<object | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);

   const baseURL = "http://localhost:3001/api"

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);

         try {
            const response = await axios({
               method: method, //you can set what request you want to be
               url: baseURL + endpoint,
               data: body,
               headers: {
                  Authorization: 'Bearer ' + token
               }
            })


            setData(response?.data);
         } catch (error) {
            if (axios.isAxiosError(error)) {
               setError(error.message);
               // do something
               // or just re-throw the error

            } else {
               setError(null);
            }

         }
         setIsLoading(false);
      };

      fetchData();
   }, [endpoint]);

   return { data, isLoading, error };
};

export default useApi;
