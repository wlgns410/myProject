import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { dailyCalorieService } from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { registerRegexesOfType } from '~/libs/util/regex';

import { IUserDailyCalorieController } from '~/@types/api/daily/request';

export const dailyCalorieController = async (req: IUserDailyCalorieController, res: Response, next: NextFunction) => {
  const { foods } = req.body;
  const { userId } = req;

  // 밸리데이션: foods가 배열이고, 각 요소가 FoodItem 형식인지 확인
  if (
    !Array.isArray(foods) ||
    !foods.every(
      (item) =>
        typeof item === 'object' &&
        !Array.isArray(item) &&
        Object.keys(item).every((key) => typeof key === 'string' && typeof item[key] === 'number'),
    )
  ) {
    return next(new ErrorResponse(ERROR_CODE.FOODS_INVAILD_INPUT));
  }

  try {
    await dailyCalorieService({ foods, userId });
    return res.status(httpStatus.CREATED).json({ status: httpStatus.CREATED, message: '음식이 기록되었습니다.' });
  } catch (e) {
    return next(e.message);
  }
};
