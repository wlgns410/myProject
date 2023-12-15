import { DailyCalorie } from '../../database/entity/DailyCalorie';
import { BodyMassIndex } from '../../database/entity/BodyMassIndex';
import { User } from '../../database/entity/Account';
import { AppDataSource } from '../../config/data-source';
import { IUserDailyCalorieService } from '~/@types/api/daily/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';
import { foodSentence } from '~/libs/util/foodSentence';
import { openAI } from '~/libs/util/chatgpt';

export const dailyCalorieService = async ({ foods, userId }: IUserDailyCalorieService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);

  const foundBodyMassIndex = await bodyMassIndexRepository.findOne({
    where: { id: userId },
    order: { createdAt: 'DESC' },
  });

  if (!foundBodyMassIndex) {
    throw new ErrorResponse(ERROR_CODE.NOT_FOUND_BMI);
  }

  const dailyCalorieRepository = AppDataSource.getRepository(DailyCalorie);

  // chatgpt 연동해서 foods의 탄단지, 칼로리 계산값 리턴
  const foodArrayToString = await foodSentence(foods);
  const openAIResult = await openAI(foodArrayToString); // 문장에서 parse 해야함

  await transactionRunner(async (queryRunner) => {
    const bmiRepo = dailyCalorieRepository.create({
      //   carbohydrate: String(carbohydrate),
      //   protein: String(protein),
      //   lipid: String(lipid),
      //   calorie: String(calorie),
      bmiId: foundBodyMassIndex.id,
      foods: foods,
    });
    await queryRunner.manager.save(bmiRepo);
  });
};
