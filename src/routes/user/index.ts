import { Router } from 'express';
import {
    userSignUpController,
    userSignUpAuthenticationNumberController,
    userSignInController,
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

export default user;
