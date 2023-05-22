import { Router } from 'express';

import authRoutes from './auth.route.js'
import useRoutes from './user.route.js'
import partyRoutes from './party.route.js'

const router = Router();

router.use('/', authRoutes);
router.use('/user', useRoutes);
router.use('/party', partyRoutes);

export default router;