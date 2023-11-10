import { Request, Express } from 'express';

export interface ITokenData {
    id: number;
    email: string;
    name: string;
    phone: string;
}

export interface IRequestWithUserId extends Request {
    userId: number;
}

export interface IRequestWithUserInfo extends IRequestWithUserId {
    user: ITokenData;
    token: string;
}
