import { Request, Express, NextFunction } from 'express';
import { IJWTTokenData } from '~/@types/utils/jwt';

export interface IRequestWithUserData extends Request {
  userId: number;
  sex: string;
  birth: string;
}

export interface IRequestWithUserId extends Request {
  userId: number;
}

export interface IRequestWithUserInfo extends IRequestWithUserData {
  user: IJWTTokenData;
  token: string;
}

export interface IRequestOnlyUserId {
  userId: number;
}
