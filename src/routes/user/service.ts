import { User } from '../../database/entity/Account';
import { UserPhoneAuth } from '../../database/entity/UserPhoneAuth';

import { AppDataSource } from '../../config/data-source';
import redisCli from '~/config/redis';
import {
  ISignUpService,
  ISignUpAuthNumService,
  ISignInService,
  IPasswordChangeService,
  IWithdrawalService,
} from '~/@types/api/user/request';
import { IRequestOnlyUserId } from '~/@types/api/request/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { createToken, logoutToken } from '~/libs/util/jwt';
import capitalizedRandomName from '~/libs/util/nickname';
import generateFourDigitRandom from '~/libs/util/generateFourDigit';
import { registerRegexesOfType } from '~/libs/util/regex';
import transactionRunner from '~/database/transaction';

export const userSignUpService = async ({ email, password, phone, userType, sex }: ISignUpService) => {
  const userRepository = AppDataSource.getRepository(User);
  const phoneExists = await userRepository.findOne({ where: { phone } });

  if (phoneExists) {
    throw new ErrorResponse(ERROR_CODE.ALREADY_SIGNUP_USER);
  }
  const nickname = capitalizedRandomName;

  const userPhoneAuthRepository = AppDataSource.getRepository(UserPhoneAuth);
  const phoneAuthData = await userPhoneAuthRepository.findOne({ where: { phone } });

  // // 레디스에 인증번호가 있는 지 핸드폰 번호로 파악(인증번호 있으면 OK -> 인증 시스템 안써서 그냥 PASS 시켰음)
  let randomNums: string | null; // 변수 선언 및 초기화;
  const key = `user_data:${phone}`;
  const data = await redisCli.get(key);
  if (data) {
    const parsedData = JSON.parse(data);
    if (parsedData.phone === phone) {
      randomNums = parsedData.randomNums; // 변수 초기화
      if (randomNums === phoneAuthData.authNums) {
        const phoneAuthRegexes = registerRegexesOfType.phoneAuth.regexes;
        const isPhoneAuthValid = phoneAuthRegexes.some((regex) => regex.test(randomNums));
        if (!isPhoneAuthValid) {
          throw new ErrorResponse(ERROR_CODE.NOT_MATCH_SESSION_USER_PHONE);
        }
      }
    } else {
      throw new ErrorResponse(ERROR_CODE.NOT_MATCH_SESSION_USER_PHONE);
    }
  } else {
    throw new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND);
  }

  await transactionRunner(async (queryRunner) => {
    const newUser = userRepository.create({
      email,
      password,
      phone,
      nickname,
      userType,
      sex,
    });
    await queryRunner.manager.save(newUser);
  });
};

export const userSignUpAuthenticationNumberService = async ({ phone }: ISignUpAuthNumService) => {
  const randomNums = generateFourDigitRandom();
  const data = JSON.stringify({ phone, randomNums });
  const key = `user_data:${phone}`;

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

export const userSignInService = async ({ phone }: ISignInService) => {
  const userRepository = AppDataSource.getRepository(User);
  const userObj = await userRepository.findOne({ where: { phone } });

  if (userObj) {
    const userId = userObj.id;
    const token = createToken({
      id: userId,
      email: userObj.email,
      nickname: userObj.nickname,
      phone: userObj.phone,
      sex: userObj.sex,
    });

    // refreshToken redis에 저장
    const { refreshToken } = token;
    redisCli.set(String(userObj.id), refreshToken);
    return token;
  }
  throw new ErrorResponse(ERROR_CODE.TOKEN_NOT_CREATE);
};

export const userLogOutService = async ({ userId }: IRequestOnlyUserId) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });
  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }
  // 로그아웃 토큰
  logoutToken();
};

export const userPasswordChangeService = async ({ originPassword, changePassword, userId }: IPasswordChangeService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });
  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  // Check if the originPassword matches the user's current password
  const isPasswordMatch = await foundUser.comparePassword(originPassword);

  if (!isPasswordMatch) {
    throw new ErrorResponse(ERROR_CODE.RIGHT_ORIGIN_PASSWORD);
  }

  // Check if the originPassword and changePassword are the same
  if (originPassword === changePassword) {
    throw new ErrorResponse(ERROR_CODE.SAME_PASSWORD);
  }

  // put(change) state
  await transactionRunner(async (queryRunner) => {
    if (foundUser) {
      foundUser.password = changePassword;
      await foundUser.savePasswordWithEncrypt();
      await queryRunner.manager.save(foundUser);
    }
  });
};

export const userWithdrawalService = async ({ password, userId }: IWithdrawalService) => {
  const userRepository = AppDataSource.getRepository(User);
  const foundUser = await userRepository.findOne({ where: { id: userId } });
  if (!foundUser) {
    throw new ErrorResponse(ERROR_CODE.UNAUTHORIZED);
  }

  const isPasswordMatch = await foundUser.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ErrorResponse(ERROR_CODE.RIGHT_ORIGIN_PASSWORD);
  }

  await transactionRunner(async (queryRunner) => {
    const userRepoInTransaction = queryRunner.manager.getRepository(User);
    await userRepoInTransaction.softDelete({ id: foundUser.id });
  });

  logoutToken();
};
