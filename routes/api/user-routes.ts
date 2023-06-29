import { Router } from "express"

// import { getUsers } from '../../controllers/user-controller'
import { getUsers, getMe, login, register, updateUser, updatePassword, deleteUser, getUserChats } from '../../controllers/user-controller'
import { authMiddleware } from "../../utils/auth";

const router = Router();

//every route should be protected
router.route('/register').post(register)
router.route('/login').post(login);

router.route('/').get(authMiddleware, getUsers)
router.route('/chats').get(authMiddleware, getUserChats)

router.route('/:id').get(authMiddleware, getMe).put(authMiddleware, updateUser).delete(authMiddleware, deleteUser)
router.route('/:id/recovery').put(authMiddleware, updatePassword)





// console.log(getUsers)

export default router;