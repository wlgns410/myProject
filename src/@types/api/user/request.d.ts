import { IRequestWithUserId } from '~/@types/api/request/request';

export interface ISignUpController {
  body: {
    email: string;
    password: string;
    phone: string;
    userType: string;
    sex: string;
  };
}

export interface ISignUpService {
  email: string;
  password: string;
  phone: string;
  userType: string;
  sex: string;
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

export interface IPasswordChangeController extends IRequestWithUserId {
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

export interface IWithdrawalController extends IRequestWithUserId {
  body: {
    password: string;
  };
}

export interface IWithdrawalService {
  password: string;
  userId: number;
}
