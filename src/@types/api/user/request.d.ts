export interface ISignUpController {
  params:{
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
    params:{
      phone: string;
    }
}

export interface ISignUpAuthNumService {
    phone: string;
}