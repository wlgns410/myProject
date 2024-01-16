import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import {
  dailyCalorieService,
  eatingAllDayService,
  eatingOneService,
  insufficientCalorieService,
  getinsufficientCalorieMessageService,
} from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import {
  IUserDailyCalorieController,
  IUserEatingOneController,
  IUserEatingAllDayController,
} from '~/@types/api/daily/request';
import { registerRegexesOfType } from '~/libs/util/regex';

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
        typeof item.food === 'string' &&
        typeof item.quantity === 'number',
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
  const { startDate, endDate } = req.query;

  if (startDate) {
    const dateRegexes = registerRegexesOfType.date.regexes;
    const isStartDateValid = dateRegexes.some((regex) => regex.test(startDate));

    if (!isStartDateValid) {
      return next(new ErrorResponse(ERROR_CODE.NOT_FOUND_DATE));
    }
  }

  if (endDate) {
    const dateRegexes = registerRegexesOfType.date.regexes;
    const isEndDateValid = dateRegexes.some((regex) => regex.test(endDate));

    if (!isEndDateValid) {
      return next(new ErrorResponse(ERROR_CODE.NOT_FOUND_DATE));
    }
  }

  try {
    const response = await eatingAllDayService({ userId: Number(userId), bmiId: Number(bmiId), startDate, endDate });
    return res
      .status(httpStatus.OK)
      .json({ data: response, status: httpStatus.OK, message: '해당 기간동안 먹은 음식을 불러왔습니다.' });
  } catch (e) {
    return next(e.message);
  }
};

export const eatingOneController = async (req: IUserEatingOneController, res: Response, next: NextFunction) => {
  const { userId } = req;
  const { dailyFoodId } = req.params;

  try {
    const response = await eatingOneService({ userId: Number(userId), dailyFoodId: Number(dailyFoodId) });
    return res
      .status(httpStatus.OK)
      .json({ data: response, status: httpStatus.OK, message: '오늘 먹은 음식을 불러왔습니다.' });
  } catch (e) {
    return next(e.message);
  }
};

export const insufficientCalorieController = async (
  req: IUserEatingAllDayController,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req;
  const { bmiId } = req.params;
  const { startDate, endDate } = req.query;

  if (startDate) {
    const dateRegexes = registerRegexesOfType.date.regexes;
    const isStartDateValid = dateRegexes.some((regex) => regex.test(startDate));

    if (!isStartDateValid) {
      return next(new ErrorResponse(ERROR_CODE.NOT_FOUND_DATE));
    }
  }

  if (endDate) {
    const dateRegexes = registerRegexesOfType.date.regexes;
    const isEndDateValid = dateRegexes.some((regex) => regex.test(endDate));

    if (!isEndDateValid) {
      return next(new ErrorResponse(ERROR_CODE.NOT_FOUND_DATE));
    }
  }

  try {
    const response = await insufficientCalorieService({
      userId: Number(userId),
      bmiId: Number(bmiId),
      startDate,
      endDate,
    });
    return res
      .status(httpStatus.OK)
      .json({ data: response, status: httpStatus.OK, message: '칼로리를 차이를 계산했습니다.' });
  } catch (e) {
    return next(e.message);
  }
};

export const getinsufficientCalorieMessageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getinsufficientCalorieMessageService();
    return res
      .status(httpStatus.OK)
      .json({ data: response, status: httpStatus.OK, message: '전송한 메시지 내역을 확인합니다.' });
  } catch (e) {
    return next(e.message);
  }
};
