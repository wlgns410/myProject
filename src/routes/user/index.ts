import { Router } from 'express';
import {
    userSignUpController,
    userSignUpAuthenticationNumberController,
  } from './controller';

const user = Router();

user
  .route('/signup')
  .post(userSignUpController)
user
  .route('/signup/auth')
  .post(userSignUpAuthenticationNumberController);

export default user;