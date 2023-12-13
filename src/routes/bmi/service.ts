import { BodyMassIndex } from '../../database/entity/BodyMassIndex';
import { User } from '../../database/entity/Account';
import { AppDataSource } from '../../config/data-source';
import { IUserBMISettingService } from '~/@types/api/bmi/request';
import { IRequestOnlyUserId } from '~/@types/api/request/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';
import { targetCalculateWeightDifference } from '~/libs/util/bmiCalculation';
import { bmrCalculation } from '~/libs/util/bmrCalculation';
import { getCurrentAgeToNumber } from '~/libs/util/birth';

export const userBMISettingService = async ({
  weight,
  height,
  userId,
  targetBody,
  sex,
  activityType,
  birth,
}: IUserBMISettingService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);

  const { targetDifference, bmiTarget } = targetCalculateWeightDifference(weight, height, targetBody);

  const currentAge = getCurrentAgeToNumber(birth);

  const { calories, bmr } = bmrCalculation(height, weight, currentAge, sex, activityType);

  await transactionRunner(async (queryRunner) => {
    const bmiRepo = bodyMassIndexRepository.create({
      weight: String(weight),
      height: String(height),
      bmiTarget: String(bmiTarget),
      targetDifference: String(targetDifference),
      activityType: activityType,
      bmrTarget: String(bmr),
      calories: String(calories),
    });
    await queryRunner.manager.save(bmiRepo);
  });
};

export const userBMIService = async ({ userId }: IRequestOnlyUserId) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });

  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);
  const foundBodyMassIndex = await bodyMassIndexRepository.findOne({ where: { userId }, order: { createdAt: 'DESC' } });

  return foundBodyMassIndex;
};
