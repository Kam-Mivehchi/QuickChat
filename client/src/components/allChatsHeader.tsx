import React from 'react'

import UserSearchBar from './userSearchBar.tsx'
function AllChatsHeader() {

   return (
      <div className="bg-base-200  relative pb-4 pt-2 rounded ">
         <h2 className="text-lg text-center font-bold">Messages</h2>
         {/* user search input goes here */}
         <UserSearchBar page={"allChats"} />
      </div >
   )
}

export default AllChatsHeader