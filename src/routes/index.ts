import { Router } from 'express';
import user from './user';

const router = Router(); //Router({ strict: false });

router.use('/user', user);

export default router;
