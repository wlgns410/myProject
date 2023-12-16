import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import { dailyCalorieController, eatingAllDayController, eatingOneController } from './controller';

const daily = Router();

daily.route('/record').all(tokenValidation).post(dailyCalorieController);
daily.route('/all').all(tokenValidation).get(eatingAllDayController);
daily.route('/one').all(tokenValidation).get(eatingOneController);

export default daily;
