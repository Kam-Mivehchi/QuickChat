import { Router } from "express"

// import { getUsers } from '../../controllers/user-controller'
import { getUsers, createUser, login } from '../../controllers/user-controller'

const router = Router();

router.route('/').get(getUsers)
router.route('/').post(createUser)
router.route('/login').post(login);

// console.log(getUsers)

export default router;