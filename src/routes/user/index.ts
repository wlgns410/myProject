import { Router } from 'express';
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
  .post(userLogOutController);
user
  .route('/changepassword')
  .patch(userPasswordChangeController);

export default user;
