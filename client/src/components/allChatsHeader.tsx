import React from 'react'
import { searchForUsers, createDM } from '../utils/api'
import { Link } from 'react-router-dom'
function AllChatsHeader() {
   const [dropdown, showDropdown] = React.useState<boolean>(false)
   const [searchInput, setSearchInput] = React.useState<string>("")
   const [matchingUsers, setMatchingUsers] = React.useState<IUser[]>([])
   const [openSearch, setOpenSearch] = React.useState<boolean | null>()
   React.useEffect(() => {

      (async () => {
         try {
            let users = await searchForUsers(searchInput)


            setMatchingUsers(users)
         } catch (err) {
            console.error(err);
         }
      })();
   }, [matchingUsers])


   async function getUsers() {


      try {
         let users = await searchForUsers(searchInput)

         console.log(users)
         setMatchingUsers(users)
         setOpenSearch(true)
      } catch (error) {
         console.error(error)
      }
   }
   async function handleNewDM(userId: string) {
      try {
         let newDM = await createDM(userId)

         console.log(newDM)
      } catch (error) {
         console.error(error)
      }
   }
   return (
      <div className="bg-base-200  relative">
         <h2 className="text-lg text-center font-bold">Messages</h2>
         {/* user search input goes here */}
         <span className="rounded-none w-full flex items-center relative" onClick={getUsers}>
            <input type="text" placeholder="Search By Username or Email" className="input  text-center border-none flex-grow " value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />

            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className='absolute right-5 top-1/2 -translate-y-1/2 '><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
         </span>
         {/* dropdown */}

         <div className={`relative transition-transform duration-200 ease-in ${openSearch ? "translate-x-0" : "translate-x-full"} z-40`}>
            <div className="bg-base-200 w-full  h-10 py-1" onClick={() => setOpenSearch(false)}>

               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='absolute right-4 top-2 btn btn-primary btn-xs'><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
            </div>
            <div className="options overflow-auto max-h-[50vh] absolute z-40 bg-base-200 w-full card  rounded-t-none">


               {matchingUsers.length ?
                  matchingUsers.map((user: IUser) => {

                     return (
                        <div className="flex items-center" key={`searchResponse${user._id}`}>
                           <Link className=" flex gap-2  collapse-title text-xl font-medium" to="" key={user._id}>
                              <div className="avatar">
                                 <div className="w-8 bg-slate-300 rounded-full ">
                                    <img src={user.avatar} alt={`${user.avatar} avatar image`} />
                                 </div>
                              </div>
                              <h1 className="card-title flex-grow">

                                 {user.username}
                              </h1>

                           </Link>
                           <div className="justify-self-end">
                              <label className="btn m-1 btn-ghost " onClick={() => handleNewDM(user._id)}>

                                 <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    {/* {Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.} */}
                                    <path d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z" /></svg>
                              </label>

                           </div>
                        </div>
                     );
                  }) :
                  <div className="text-center pb-2">No Matching Users Found</div>}
            </div>
         </div>
      </div >
   )
}

export default AllChatsHeader