import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import { userProfileController } from './controller';

const profile = Router();

profile.route('/save').all(tokenValidation).post(userProfileController);

export default profile;
