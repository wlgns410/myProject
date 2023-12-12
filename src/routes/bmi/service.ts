import { BodyMassIndex } from '../../database/entity/BodyMassIndex';
import { AppDataSource } from '../../config/data-source';
import {
    IUserBMISettingService,
} from '~/@types/api/bmi/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import transactionRunner from '~/database/transaction';

export const userBMISettingService = async ({ weight, height, userId }: IUserBMISettingService) => {
  
    // 1분동안 다른 인증번호는 생성 못하게 막음(FE에서)
    const expirationTime = 60000; // 1분 (60,000 밀리초)
    await redisCli.pSetEx(key, expirationTime, data);
  
    const userPhoneAuthRepository = AppDataSource.getRepository(UserPhoneAuth);
    const phoneAuthData = await userPhoneAuthRepository.findOne({ where: { phone } });
    await transactionRunner(async (queryRunner) => {
      if (phoneAuthData) {
        await queryRunner.manager.remove(phoneAuthData);
      } else {
        const newUser = userPhoneAuthRepository.create({
          phone,
          authNums: randomNums,
        });
        await queryRunner.manager.save(newUser);
      }
    });
  
    return randomNums;
  };

