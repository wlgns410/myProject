import jwt from 'jsonwebtoken';
import { IJWTTokenData } from '~/@types/utils/jwt';
import { IRequestWithUserInfo } from '~/@types/api/request/request';
import { NextFunction, Response } from 'express';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

const { TOKEN_SECRET } = process.env;

export const createToken = (auth: IJWTTokenData) => {
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
