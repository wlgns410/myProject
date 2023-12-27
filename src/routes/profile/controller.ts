import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { userProfileService } from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { IUserProfileController } from '~/@types/api/profile/request';
import { registerRegexesOfType } from '~/libs/util/regex';
import imageUpload from '~/libs/util/imageUpload';

export const userProfileController = async (req: IUserProfileController, res: Response, next: NextFunction) => {
  const { postalAddress, roadNameAddress } = req.body;
  const { userId } = req;
  const { buffer } = req.file;

  const imageUrl = await imageUpload(buffer);

  if (postalAddress) {
    const postalAddressRegexes = registerRegexesOfType.postal.regexes;
    const isPostalAddressValid = postalAddressRegexes.some((regex) => regex.test(postalAddress));

    if (!isPostalAddressValid) {
      return next(new ErrorResponse(ERROR_CODE.INVAILD_POSTAL_FORMAT));
    }
  }

  if (roadNameAddress) {
    const roadNameAddressRegexes = registerRegexesOfType.roadName.regexes;
    const isRoadNameAddressRegexesValid = roadNameAddressRegexes.some((regex) => regex.test(roadNameAddress));

    if (!isRoadNameAddressRegexesValid) {
      return next(new ErrorResponse(ERROR_CODE.INVAILD_ROAD_NAME_FORMAT));
    }
  }

  try {
    await userProfileService({ postalAddress, roadNameAddress, imageUrl, userId });
    return res.status(httpStatus.ACCEPTED).json({ status: httpStatus.ACCEPTED, message: '프로필이 저장되었습니다.' });
  } catch (e) {
    return next(e.message);
  }
};
