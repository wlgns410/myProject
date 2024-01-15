import { User } from '../../database/entity/Account';
import { AppDataSource } from '../../config/data-source';
import redisCli from '~/config/redis';
import { ISignUpService, ISignInService, IPasswordChangeService, IWithdrawalService } from '~/@types/api/user/request';
import { IRequestOnlyUserId } from '~/@types/api/request/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { createToken, logoutToken } from '~/libs/util/jwt';
import capitalizedRandomName from '~/libs/util/nickname';
import transactionRunner from '~/database/transaction';

export const userSignUpService = async ({ email, password, phone, userType, sex, birth }: ISignUpService) => {
  const userRepository = AppDataSource.getRepository(User);
  const phoneExists = await userRepository.findOne({ where: { phone } });

  if (phoneExists) {
    throw new ErrorResponse(ERROR_CODE.ALREADY_SIGNUP_USER);
  }
  const nickname = capitalizedRandomName;

  await transactionRunner(async (queryRunner) => {
    const newUser = userRepository.create({
      email,
      password,
      phone,
      nickname,
      userType,
      sex,
      birth,
    });
    await queryRunner.manager.save(newUser);
  });
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
      birth: userObj.birth,
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

  // redis에서 refresh token 제거
  redisCli.del(String(userId));
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
