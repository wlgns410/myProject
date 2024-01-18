import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
  userPasswordChangeController,
  userWithdrawalController,
} from './controller';

const user = Router();

user.route('/signup').post(userSignUpController);
user.route('/signin').post(userSignInController);
user.route('/logout').all(tokenValidation).post(userLogOutController);
user.route('/changepassword').all(tokenValidation).patch(userPasswordChangeController);
user.route('/withdrawal').all(tokenValidation).delete(userWithdrawalController);

export default user;
