import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import { userBMISettingController, userBMIController } from './controller';

const bmi = Router();

bmi.route('/target').all(tokenValidation).post(userBMISettingController);
bmi.route('/me').all(tokenValidation).get(userBMIController);

export default bmi;
