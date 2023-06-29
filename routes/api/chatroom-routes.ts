import { Router } from "express"


import { getSingleChat, getUserChats, createChat, addMemberToChat, removeMemberFromChat, deleteChat } from '../../controllers/chatroom-controller'


const router = Router();

//every route should be protected
// router.route('/register').post(register)
// router.route('/login').post(login);

// router.route('/').get(getUsers)
// router.route('/:id').get(getMe).put(updateUser).delete(deleteUser)
// router.route('/:id/recovery').put(updatePassword)
//creates a new chat
router.route('/').post(createChat)
//gets chat data or deletes the room entirely as admin
router.route('/:id').get(getSingleChat).delete(deleteChat)

//adds members to a chatroom
router.route('/:id/add').post(addMemberToChat)
// handles leaving the chat and removing people as admin
router.route('/:id/remove').post(removeMemberFromChat)





// console.log(getUsers)

export default router;