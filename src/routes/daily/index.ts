import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import {
  dailyCalorieController,
  eatingAllDayController,
  eatingOneController,
  insufficientCalorieController,
} from './controller';

const daily = Router();

daily.route('/record').all(tokenValidation).post(dailyCalorieController);
daily.route('/all/:bmiId').all(tokenValidation).get(eatingAllDayController);
daily.route('/one/:dailyFoodId').all(tokenValidation).get(eatingOneController);
daily.route('/difference/:bmiId').all(tokenValidation).get(insufficientCalorieController);

export default daily;
