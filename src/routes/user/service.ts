import { UserRepository } from '~/database/repository';
import { User } from '~/database/entity';
import  AppDataSource from '~/config/db';
import redisCli from '~/config/redis';
import { ISignUpService, ISignUpAuthNumService } from '~/@types/api/user/request'
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import capitalizedRandomName from '~/libs/nickname';
import generateFourDigitRandom from '~/libs/generateFourDigit';

export const userSignUpService= async ({
    email,password,phone,userType,
}: ISignUpService) =>{
    // DB에 전화번호 있는지 파악
    const userRepository = AppDataSource.getRepository(User)
    const phoneExists = await userRepository.findOne({ where: { phone } });

    if (phoneExists){
        throw new ErrorResponse(ERROR_CODE.ALREADY_SIGNUP_USER)
    }

    const nickname = capitalizedRandomName;




    // redis에 인증번호, 전화번호 있는지 파악
    // DB 저장
    // create라서 리턴은 없음.
};

export const userSignUpAuthenticationNumberService= async ({
    phone,
}: ISignUpAuthNumService) =>{

    const randomNums = generateFourDigitRandom;
    const data = JSON.stringify({ phone, randomNums });
    await redisCli.set('user_data', data);
    return randomNums;
};
