import { Router } from "express"

// import { getUsers } from '../../controllers/user-controller'
import { getUsers, getMe, login, register, updateUser, updatePassword, deleteUser } from '../../controllers/user-controller'


const router = Router();

//every route should be protected
router.route('/register').post(register)
router.route('/login').post(login);

router.route('/').get(getUsers)
router.route('/:id').get(getMe).put(updateUser).delete(deleteUser)
router.route('/:id/recovery').put(updatePassword)




// console.log(getUsers)

export default router;