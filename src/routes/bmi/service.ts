import { BodyMassIndex } from '../../database/entity/BodyMassIndex';
import { User } from '../../database/entity/Account';
import { AppDataSource } from '../../config/data-source';
import {
    IUserBMISettingService,
} from '~/@types/api/bmi/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';

export const userBMISettingService = async ({ weight, height, userId }: IUserBMISettingService) => {
  
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOne({ where: { id: userId } });

    if (!foundUser) {
        throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
    }

    const bodyMassIndexRepository = AppDataSource.getRepository(BodyMassIndex);


  };

