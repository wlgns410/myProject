import { BodyMassIndex } from '../../database/entity/BodyMassIndex';
import { User } from '../../database/entity/Account';
import { AppDataSource } from '../../config/data-source';
import {
    IUserBMISettingService,
} from '~/@types/api/bmi/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';
import { targetCalculateWeightDifference } from '~/libs/util/bmiCalculation';

export const userBMISettingService = async ({ weight, height, userId, targetBody }: IUserBMISettingService) => {
  
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOne({ where: { id: userId } });

    if (!foundUser) {
        throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
    }

    const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);

    const { targetDifference, bmiTarget } = targetCalculateWeightDifference(weight, height, targetBody)

    await transactionRunner(async (queryRunner) => {
    const bmiRepo = bodyMassIndexRepository.create({
        weight: String(weight),
        height: String(height),
        bmiTarget: String(bmiTarget), // 또는 targetBody?.toString() 등으로 수정
        targetDifference: String(targetDifference),
    });
    await queryRunner.manager.save(bmiRepo);
    });
};

