import { Router } from "express"

// import { getUsers } from '../../controllers/user-controller'
import { getUsers, getMe, login, register, updateUser, updatePassword, deleteUser, getUserChats } from '../../controllers/user-controller'
import { authMiddleware } from "../../utils/auth";

const router = Router();

router.route('/').get(authMiddleware, getUsers)
//every route should be protected
router.route('/register').post(register)
router.route('/login').post(login);

router.route('/chats').get(authMiddleware, getUserChats)

router.route('/:userId').get(authMiddleware, getMe).put(authMiddleware, updateUser).delete(authMiddleware, deleteUser)
router.route('/:userId/recovery').put(authMiddleware, updatePassword)





// console.log(getUsers)

export default router;