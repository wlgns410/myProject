import { IRequestWithUserData } from '~/@types/api/request/request';

export interface IUserBMISettingController extends IRequestWithUserData {
  body: {
    height: string;
    weight: string;
    targetBody: string;
    activityType: string;
  };
}

export interface IUserBMISettingService {
  height: number;
  weight: number;
  userId: number;
  targetBody: string;
  sex: string;
  activityType: string;
  birth: string;
}

export interface IUserBMIService {
  userId: number;
}
