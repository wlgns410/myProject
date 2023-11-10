import { User } from '~/database/entity';
import { UserPhoneAuth } from '~/database/entity';
import { AppDataSource } from '~/config/db';
import redisCli from '~/config/redis';
import { ISignUpService, ISignUpAuthNumService, ISignInService, ILogoutService, IPasswordChangeService } from '~/@types/api/user/request'
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { createToken, verifyToken } from '~/libs/jwt';
import capitalizedRandomName from '~/libs/nickname';
import generateFourDigitRandom from '~/libs/generateFourDigit';
import { registerRegexesOfType } from '~/libs/regex';
import transactionRunner from '~/database/transaction';

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

    const userPhoneAuthRepository = AppDataSource.getRepository(UserPhoneAuth)
    const phoneAuthData = await userPhoneAuthRepository.findOne({ where: { phone } });

    // 레디스에 인증번호가 있는 지 핸드폰 번호로 파악(인증번호 있으면 OK -> 인증 시스템 안써서 그냥 PASS 시켰음)
    let randomNums: string | null; // 변수 선언 및 초기화;
    const key = `user_data:${phone}`;
    const data = await redisCli.get(key);
    if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData.phone === phone) {
            randomNums = parsedData.randomNums; // 변수 초기화
            if (randomNums === phoneAuthData.authNums) {
                const phoneAuthRegexes = registerRegexesOfType.phoneAuth.regexes;
                const isPhoneAuthValid = phoneAuthRegexes.some(regex => regex.test(randomNums));
                if (!isPhoneAuthValid) {
                    throw new ErrorResponse(ERROR_CODE.NOT_MATCH_SESSION_USER_PHONE);
                }
            }
        } else {
            throw new ErrorResponse(ERROR_CODE.NOT_MATCH_SESSION_USER_PHONE);
        }
    } else {
        throw new ErrorResponse(ERROR_CODE.NOT_FOUND_REDIS_SESSION_USER);
    }

    await transactionRunner(async (queryRunner) => {
        const newUser = userRepository.create({
            email,
            password,
            phone,
            userType,
            nickname,
        });
        await queryRunner.manager.save(newUser);
    });
};

export const userSignUpAuthenticationNumberService= async ({
    phone,
}: ISignUpAuthNumService) =>{

    const randomNums = generateFourDigitRandom();
    const data = JSON.stringify({ phone, randomNums });
    const key = `user_data:${phone}`;

    // 1분동안 다른 인증번호는 생성 못하게 막음(FE에서)
    const expirationTime = 60000; // 1분 (60,000 밀리초)
    await redisCli.psetex(key, expirationTime, data);

    const userPhoneAuthRepository = AppDataSource.getRepository(UserPhoneAuth)
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

export const userSignInService= async ({
    phone
}: ISignInService) =>{

    const userRepository = AppDataSource.getRepository(User)
    const userObj = await userRepository.findOne({ where: { phone } });

    if (userObj) {
        const userId = userObj.id;
        const token = createToken({ 
            id: userId, 
            email: userObj.email, 
            nickname: userObj.nickname, 
            phone: userObj.phone 
          });
          return { accessToken: token };
    }
    throw new ErrorResponse(ERROR_CODE.TOKEN_NOT_CREATE);
};

export const userLogOutService = async ({ token }: ILogoutService) => {
    const { id: userId } = verifyToken(token);

    const userRepository = AppDataSource.getRepository(User)
    const foundUser = await userRepository.findOne({ where: { id:userId } });
    if (!foundUser) {
      throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
    }
};

  export const userPasswordChangeService = async ({ originPassword, changePassword }: IPasswordChangeService) => {
    const { id: userId } = verifyToken(token);

    const userRepository = AppDataSource.getRepository(User)
    const foundUser = await userRepository.findOne({ where: { id:userId } });
    if (!foundUser) {
      throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
    }
  };