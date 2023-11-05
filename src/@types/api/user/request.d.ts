export interface ISignUpController {
  body:{
    email: string;
    password: string;
    phone: string;
    userType: string;
    }
}

export interface ISignUpService {
    email: string;
    password: string;
    phone: string;
    userType: string;
}

export interface ISignUpAuthNumController {
    body:{
      phone: string;
    }
}

export interface ISignUpAuthNumService {
    phone: string;
}

