
import { Router } from "express"
import userRoutes from "./user-routes"
// const userRoutes = require('./user-routes');
// const thoughtRoutes = require('./thought-routes');

const router = Router();

router.use('/users', userRoutes);
// router.use('/thoughts', thoughtRoutes);

export default router;
