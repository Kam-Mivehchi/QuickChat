
import { Router } from "express"
import userRoutes from "./user-routes"
import chatroomRoutes from "./chatroom-routes"
import { authMiddleware } from "../../utils/auth";

const router = Router();

router.use('/users', userRoutes);
router.use('/chat', authMiddleware, chatroomRoutes);
// router.use('/thoughts', thoughtRoutes);

export default router;
