import { Router } from 'express';
import { tokenValidation } from '~/libs/jwt';
import {
    userSignUpController,
    userSignUpAuthenticationNumberController,
    userSignInController,
    userLogOutController,
    userPasswordChangeController,
  } from './controller';

const user = Router();

user
  .route('/signup')
  .post(userSignUpController)
user
  .route('/signup/auth')
  .post(userSignUpAuthenticationNumberController);
user
  .route('/signin')
  .post(userSignInController);
user
  .route('/logout')
  .post(tokenValidation, userLogOutController);
user
  .route('/changepassword')
  .patch(tokenValidation, userPasswordChangeController);

export default user;
