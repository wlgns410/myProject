import { IRequestWithUserId } from '~/@types/api/request/request';

export interface IUserBMISettingController extends IRequestWithUserId {
    body: {
      height: number;
      weight: number;
    };
}

export interface IUserBMISettingService {
    height: number;
    weight: number;
    userId: number;
}
