import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import { dailyCalorieController } from './controller';

const daily = Router();

daily.route('/record').all(tokenValidation).post(dailyCalorieController);

export default daily;
