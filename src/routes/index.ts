import { Router } from 'express';
import user from './user';
import bmi from './bmi';
import daily from './daily';

const router = Router();

router.use('/user', user);
router.use('/bmi', bmi);
router.use('/daily', daily);

export default router;
