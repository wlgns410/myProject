import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { userBMISettingService, userBMIService } from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { registerRegexesOfType } from '~/libs/util/regex';
import { IUserBMISettingController } from '~/@types/api/bmi/request';
import { IRequestWithUserData } from '~/@types/api/request/request';
import { BodyType, ActivityType } from '~/libs/util/enum';

export const userBMISettingController = async (req: IUserBMISettingController, res: Response, next: NextFunction) => {
  const { height, weight, targetBody, activityType } = req.body;
  const { userId, sex, birth } = req;

  if (!height) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (height) {
    const heightRegexes = registerRegexesOfType.height.regexes;
    const isHeightValid = heightRegexes.some((regex) => regex.test(height));

    if (!isHeightValid) {
      return next(new ErrorResponse(ERROR_CODE.RIGHT_HEIGHT));
    }
  }

  if (!weight) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (weight) {
    const weightRegexes = registerRegexesOfType.weight.regexes;
    const isWeightValid = weightRegexes.some((regex) => regex.test(weight));

    if (!isWeightValid) {
      return next(new ErrorResponse(ERROR_CODE.RIGHT_WEIGHT));
    }
  }

  if (!targetBody) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (!BodyType.isValid(targetBody)) {
    return next(new ErrorResponse(ERROR_CODE.BODY_TYPE_INVAILD_INPUT));
  }

  if (!activityType) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (!ActivityType.isValid(activityType)) {
    return next(new ErrorResponse(ERROR_CODE.ACTIVITY_TYPE_INVAILD_INPUT));
  }

  try {
    const response = await userBMISettingService({
      height: Number(height),
      weight: Number(weight),
      userId: Number(userId),
      targetBody: String(targetBody),
      sex: String(sex),
      activityType: String(activityType),
      birth: String(birth),
    });
    return res
      .status(httpStatus.CREATED)
      .json({ data: response, status: httpStatus.CREATED, message: '정상적으로 BMI가 저장되었습니다.' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const userBMIController = async (req: IRequestWithUserData, res: Response, next: NextFunction) => {
  const { userId } = req;

  try {
    const response = await userBMIService({
      userId: Number(userId),
    });
    return res
      .status(httpStatus.OK)
      .json({ data: response, status: httpStatus.OK, message: '정상적으로 BMI가 조회되었습니다.' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
