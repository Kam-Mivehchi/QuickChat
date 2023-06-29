import { Router } from "express"


import { getSingleChat, createChat, addMemberToChat, removeMemberFromChat, deleteChat } from '../../controllers/chatroom-controller'


const router = Router();

//creates a new chat
router.route('/').post(createChat)
//gets chat data or deletes the room entirely as admin
router.route('/:id').get(getSingleChat).delete(deleteChat)
//adds members to a chatroom
router.route('/:id/add').put(addMemberToChat)
// handles leaving the chat and removing people as admin
router.route('/:id/remove').put(removeMemberFromChat)


export default router;