import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { dailyCalorieService, eatingAllDayService, eatingOneService } from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import {
  IUserDailyCalorieController,
  IUserEatingOneController,
  IUserEatingAllDayController,
} from '~/@types/api/daily/request';
import { IRequestWithUserId } from '~/@types/api/request/request';

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

export const eatingAllDayController = async (req: IUserEatingAllDayController, res: Response, next: NextFunction) => {
  const { userId } = req;
  const { bmiId } = req.params;

  try {
    await eatingAllDayService({ userId: Number(userId), bmiId: Number(bmiId) });
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: '하루동안 먹은 음식을 불러왔습니다.' });
  } catch (e) {
    return next(e.message);
  }
};

export const eatingOneController = async (req: IUserEatingOneController, res: Response, next: NextFunction) => {
  const { userId } = req;
  const { dailyFoodId } = req.params;

  try {
    await eatingOneService({ userId: Number(userId), dailyFoodId: Number(dailyFoodId) });
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: '오늘 먹은 음식을 불러왔습니다.' });
  } catch (e) {
    return next(e.message);
  }
};
