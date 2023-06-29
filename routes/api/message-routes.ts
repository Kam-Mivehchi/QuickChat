import { Router } from "express"


import { allMessages, sendMessage } from '../../controllers/message-controller'


const router = Router();

router.route('/').post(sendMessage)
router.route('/:chatId').get(allMessages)



export default router