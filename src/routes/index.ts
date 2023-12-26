import { Router } from 'express';
import user from './user';
import bmi from './bmi';

const router = Router();

router.use('/user', user);
router.use('/bmi', bmi);


export default router;
