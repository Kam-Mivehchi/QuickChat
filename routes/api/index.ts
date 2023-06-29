
import { Router } from "express"
import userRoutes from "./user-routes"
import chatroomRoutes from "./chatroom-routes"
// const userRoutes = require('./user-routes');
// const thoughtRoutes = require('./thought-routes');

const router = Router();

router.use('/users', userRoutes);
router.use('/chat', chatroomRoutes);
// router.use('/thoughts', thoughtRoutes);

export default router;
