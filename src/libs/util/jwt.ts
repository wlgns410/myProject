import { NextFunction, Response, Request } from 'express';

import { IJWTTokenData } from '~/@types/utils/jwt';
import { IRequestWithUserInfo } from '~/@types/api/request/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { TOKEN_SECRET, DB_LOCAL_TYPE } = process.env;
console.log('TOKEN_SECRET', TOKEN_SECRET);
console.log('DB_LOCAL_TYPE', DB_LOCAL_TYPE);

export const createToken = (auth: IJWTTokenData) => {
  console.log("working create token?")
  return jwt.sign(auth, TOKEN_SECRET, { expiresIn: '1M' });
};

export const verifyToken = (token: string) => {
  if (!token) return null;

  try {
    return jwt.verify(token, TOKEN_SECRET, { ignoreExpiration: true }) as IJWTTokenData;
  } catch (error) {
    return null;
  }
};

export const tokenValidation = async (req: IRequestWithUserInfo, _: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(new ErrorResponse(ERROR_CODE.UNAUTHORIZED));
  }

  const token: string = req.headers.authorization.split('Bearer ')[1];
  const isVerified = verifyToken(token);
  req.userId = isVerified.id;
};

export const logoutToken = () => {
  return jwt.sign({ type: 'logout' }, TOKEN_SECRET, { expiresIn: '0s' });
};
