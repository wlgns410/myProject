import { IRequestWithUserData, IRequestWithUserId } from '~/@types/api/request/request';

export interface IUserProfileController extends IRequestWithUserData {
  body: {
    image: string;
    postalAddress: string;
    roadNameAddress: string;
  };
}

export interface IUserProfileService {
  image: string;
  postalAddress: string;
  roadNameAddress: string;
  userId: number;
}
