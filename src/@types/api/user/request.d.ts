import { IRequestWithUserData } from '~/@types/api/request/request';

export interface ISignUpController {
  body: {
    email: string;
    password: string;
    phone: string;
    userType: string;
    sex: string;
    birth: string;
  };
}

export interface ISignUpService {
  email: string;
  password: string;
  phone: string;
  userType: string;
  sex: string;
  birth: string;
}

export interface ISignUpAuthNumController {
  body: {
    phone: string;
  };
}

export interface ISignUpAuthNumService {
  phone: string;
}

export interface ISignInController {
  body: {
    password: string;
    phone: string;
  };
}

export interface ISignInService {
  phone: string;
}

export interface ILogoutService {
  userId: number;
}

export interface IPasswordChangeController extends IRequestWithUserData {
  body: {
    originPassword: string;
    changePassword: string;
  };
}

export interface IPasswordChangeService {
  originPassword: string;
  changePassword: string;
  userId: number;
}

export interface IWithdrawalController extends IRequestWithUserData {
  body: {
    password: string;
  };
}

export interface IWithdrawalService {
  password: string;
  userId: number;
}
