import { Router } from 'express';
import { tokenValidation } from '~/libs/util/jwt';
import {
  userSignUpController,
  userSignUpAuthenticationNumberController,
  userSignInController,
  userLogOutController,
  userPasswordChangeController,
  userWithdrawalController,
} from './controller';

const user = Router();

user.route('/signup').post(userSignUpController);
user.route('/signup/auth').post(userSignUpAuthenticationNumberController);
user.route('/signin').post(userSignInController);
user.route('/logout').all(tokenValidation).post(userLogOutController);
user.route('/changepassword').all(tokenValidation).patch(userPasswordChangeController);
user.route('/withdrawal').all(tokenValidation).delete(userWithdrawalController);

export default user;
