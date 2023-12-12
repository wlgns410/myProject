import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import {
  userBMISettingController
} from './controller';

const bmi = Router();

bmi.route('/target').all(tokenValidation).post(userBMISettingController);

export default bmi;
