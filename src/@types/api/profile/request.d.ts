import { IRequestWithUserData, IRequestWithUserId } from '~/@types/api/request/request';

export interface IUserProfileController extends IRequestWithUserData {
  body: {
    postalAddress: string;
    roadNameAddress: string;
  };
  file: Express.Multer.File;
}

export interface IUserProfileService {
  imageUrl: string;
  postalAddress: string;
  roadNameAddress: string;
  userId: number;
}
