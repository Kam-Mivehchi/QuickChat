import { Router } from "express"
import { allMessages, sendMessage } from '../../controllers/message-controller'


import { getSingleChat, createChat, addMemberToChat, removeMemberFromChat, deleteChat, getChatById } from '../../controllers/chatroom-controller'


const router = Router();

//creates a new chat
router.route('/').post(createChat)
router.route('/view').post(getSingleChat)
//gets chat data or deletes the room entirely as admin
router.route('/:chatId').get(getChatById).delete(deleteChat).post(sendMessage)

router.route('/:chatId/messages').get(allMessages)


//future
// router.route('/:chatId/members').put(editChatMembers)


//adds members to a chatroom
router.route('/:chatId/add').put(addMemberToChat)
// handles leaving the chat and removing people as admin
router.route('/:chatId/remove').put(removeMemberFromChat)


export default router;