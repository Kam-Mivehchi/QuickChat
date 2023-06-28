import { Router } from "express"

// import { getUsers } from '../../controllers/user-controller'
import { getUsers, getMe, login, register, updateUser, updatePassword } from '../../controllers/user-controller'


const router = Router();

//every route should be protected
router.route('/').get(getUsers)
router.route('/:id').get(getMe).put(updateUser)
router.route('/:id/recovery').put(updatePassword)

router.route('/register').post(register)
router.route('/login').post(login);

// console.log(getUsers)

export default router;