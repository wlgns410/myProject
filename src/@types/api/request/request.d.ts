import { Request, Express, NextFunction } from 'express';
import { IJWTTokenData } from '~/@types/utils/jwt';

export interface IRequestWithUserId extends Request {
  userId: number;
  sex: string;
}

export interface IRequestWithUserIdLogOut extends Request {
  userId: number;
}

export interface IRequestWithUserInfo extends IRequestWithUserId {
  user: IJWTTokenData;
  token: string;
}

export interface IRequestOnlyUserId {
  userId: number;
}
