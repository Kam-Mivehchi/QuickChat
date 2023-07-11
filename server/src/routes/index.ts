
import { Router, Request, Response } from "express"

import apiRoutes from './api'

const router = Router();

router.use('/api', apiRoutes);

router.use((req: Request, res: Response) => {
   return res.send('Wrong route!');
});

export default router;