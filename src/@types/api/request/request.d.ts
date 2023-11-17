import { Request, Express } from 'express';
import { IJWTTokenData } from '~/@types/utils/jwt';

export interface IRequestWithUserId extends Request {
  userId: number;
}

export interface IRequestWithUserInfo extends IRequestWithUserId {
  user: IJWTTokenData;
  token: string;
}
