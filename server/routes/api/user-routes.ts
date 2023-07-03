import { Router } from "express"
import { getMe, login, register, updateUser, updatePassword, deleteUser, getUserChats, searchUsers } from '../../controllers/user-controller'
import { authMiddleware } from "../../utils/auth";

const router = Router();

router.route('/').post(authMiddleware, searchUsers)
//every route should be protected
router.route('/register').post(register)
router.route('/login').post(login);

router.route('/chats').get(authMiddleware, getUserChats)

router.route('/:userId').get(authMiddleware, getMe).put(authMiddleware, updateUser).delete(authMiddleware, deleteUser)
router.route('/:userId/recovery').put(authMiddleware, updatePassword)





// console.log(searchUsers)

export default router;