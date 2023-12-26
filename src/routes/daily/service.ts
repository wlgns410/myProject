import { DailyCalorie } from '../../database/entity/DailyCalorie';
import { BodyMassIndex } from '../../database/entity/BodyMassIndex';
import { User } from '../../database/entity/Account';
import { AppDataSource } from '../../config/data-source';
import { IUserDailyCalorieService, IUserEatingAllDayService, IUserEatingOneService } from '~/@types/api/daily/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';
import { foodSentence, parseGPTSentence } from '~/libs/util/foodSentence';
import { openAI } from '~/libs/util/openAI';
import { getPeriod } from '~/libs/util/datetime';
import { Between } from 'typeorm';

export const dailyCalorieService = async ({ foods, userId }: IUserDailyCalorieService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);

  const foundBodyMassIndex = await bodyMassIndexRepository.findOne({
    where: { userId },
    order: { createdAt: 'DESC' },
  });

  if (!foundBodyMassIndex) {
    throw new ErrorResponse(ERROR_CODE.NOT_FOUND_BMI);
  }

  const dailyCalorieRepository = AppDataSource.getRepository(DailyCalorie);

  // chatgpt 연동해서 foods의 탄단지, 칼로리 계산값 리턴
  if (!foods || foods.length === 0) {
    throw new ErrorResponse(ERROR_CODE.FOODS_INVAILD_INPUT);
  }

  const foodArrayToString = await foodSentence(foods);
  const openAIResponse = await openAI(foodArrayToString); // 문장에서 parse 해야함

  if (openAIResponse == null) {
    throw new ErrorResponse(ERROR_CODE.NOT_RETURN_CHATGPT);
  }

  const { carbohydrate, protein, lipid, calorie } = await parseGPTSentence(openAIResponse);

  await transactionRunner(async (queryRunner) => {
    const bmiRepo = dailyCalorieRepository.create({
      carbohydrate: carbohydrate,
      protein: protein,
      lipid: lipid,
      calorie: calorie,
      bmiId: foundBodyMassIndex.id,
      foods: foods,
    });
    await queryRunner.manager.save(bmiRepo);
  });
};

export const eatingAllDayService = async ({ userId, bmiId, startDate, endDate }: IUserEatingAllDayService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });
  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }
  const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);
  const foundBodyMassIndex = await bodyMassIndexRepository.findOne({
    where: { id: bmiId },
  });
  if (!foundBodyMassIndex) {
    throw new ErrorResponse(ERROR_CODE.NOT_FOUND_BMI);
  }

  const { startOfDay, endOfDay } = getPeriod(startDate, endDate);

  const dailyCalorieRepository = AppDataSource.getRepository(DailyCalorie);
  const foundDailyCalorie = await dailyCalorieRepository.find({
    where: {
      bmiId,
      createdAt: Between(startOfDay, endOfDay),
    },
    order: { createdAt: 'ASC' },
  });

  return foundDailyCalorie;
};

export const eatingOneService = async ({ userId, dailyFoodId }: IUserEatingOneService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });
  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const dailyCalorieRepository = AppDataSource.getRepository(DailyCalorie);
  const foundDailyCalorie = await dailyCalorieRepository.findOne({
    where: {
      id: dailyFoodId,
    },
  });
  if (!foundDailyCalorie) {
    throw new ErrorResponse(ERROR_CODE.NOT_FOUND_DAILY);
  }

  return foundDailyCalorie;
};

export const insufficientCalorieService = async ({ userId, bmiId, startDate, endDate }: IUserEatingAllDayService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });
  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);
  const foundBodyMassIndex = await bodyMassIndexRepository.findOne({
    where: { id: bmiId },
  });
  if (!foundBodyMassIndex) {
    throw new ErrorResponse(ERROR_CODE.NOT_FOUND_BMI);
  }

  const { startOfDay, endOfDay } = getPeriod(startDate, endDate);

  const dailyCalorieRepository = AppDataSource.getRepository(DailyCalorie);
  const foundDailyCalorie = await dailyCalorieRepository.find({
    where: {
      bmiId,
      createdAt: Between(startOfDay, endOfDay),
    },
    order: { createdAt: 'ASC' },
  });

  // 해당 기간동안 칼로리 차이값
  // 섭취 칼로리를 등록한적 없으면 빈배열 반환
  const responseArray = [];
  if (foundDailyCalorie.length > 0) {
    foundDailyCalorie.forEach((dailyCalorie) => {
      const caloriesAsNumber: number = parseFloat(foundBodyMassIndex.calories);
      const calorieAsNumber: number = parseFloat(dailyCalorie.calorie);

      const difference: number = caloriesAsNumber - calorieAsNumber;
      responseArray.push({
        createdAt: dailyCalorie.createdAt,
        difference,
      });
    });
  }

  return responseArray;
};
