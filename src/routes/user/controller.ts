import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import {
  userSignUpService,
  userSignInService,
  userLogOutService,
  userPasswordChangeService,
  userWithdrawalService,
} from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { registerRegexesOfType } from '~/libs/util/regex';
import { UserType, SexType } from '~/libs/util/enum';
import {
  ISignUpController,
  ISignInController,
  IPasswordChangeController,
  IWithdrawalController,
} from '~/@types/api/user/request';
import { IRequestWithUserData } from '~/@types/api/request/request';

export const userSignUpController = async (req: ISignUpController, res: Response, next: NextFunction) => {
  const { email, password, phone, userType, sex, birth } = req.body;
  if (!email && !password && !phone) {
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
  }

  if (email) {
    const emailRegexes = registerRegexesOfType.email.regexes;
    const isEmailValid = emailRegexes.some((regex) => regex.test(email));

    if (!isEmailValid) {
      return next(new ErrorResponse(ERROR_CODE.EMAIL_INVAILD_INPUT));
    }
  }

  if (password) {
    const passwordRegexes = registerRegexesOfType.password.regexes;
    const isPasswordValid = passwordRegexes.some((regex) => regex.test(password));

    if (!isPasswordValid) {
      return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
    }
  }

  if (phone) {
    const phoneRegexes = registerRegexesOfType.phone.regexes;
    const isPhoneValid = phoneRegexes.some((regex) => regex.test(phone));

    if (!isPhoneValid) {
      return next(new ErrorResponse(ERROR_CODE.PHONE_INVAILD_INPUT));
    }
  }

  if (birth) {
    const birthRegexes = registerRegexesOfType.birth.regexes;
    const isBirthValid = birthRegexes.some((regex) => regex.test(birth));

    if (!isBirthValid) {
      return next(new ErrorResponse(ERROR_CODE.BIRTH_TYPE_INVAILD_INPUT));
    }
  }

  if (!UserType.isValid(userType)) {
    return next(new ErrorResponse(ERROR_CODE.USER_TYPE_INVAILD_INPUT));
  }

  const userEnum = UserType[userType].name;

  if (!SexType.isValid(sex)) {
    return next(new ErrorResponse(ERROR_CODE.SEX_TYPE_INVAILD_INPUT));
  }

  const sexEnum = SexType[sex].name;

  try {
    await userSignUpService({ email, password, phone, userType: userEnum, sex: sexEnum, birth });
    return res
      .status(httpStatus.CREATED)
      .json({ status: httpStatus.CREATED, message: '정상적으로 회원가입 되었습니다.' });
  } catch (e) {
    return next(e.message);
  }
};

export const userSignInController = async (req: ISignInController, res: Response, next: NextFunction) => {
  const { phone, password } = req.body;
  if (!phone) {
    return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
  }

  if (phone) {
    const phoneRegexes = registerRegexesOfType.phone.regexes;
    const isPhoneValid = phoneRegexes.some((regex) => regex.test(phone));

    if (!isPhoneValid) {
      return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
    }
  }

  if (!password) {
    return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
  }

  if (password) {
    const passwordRegexes = registerRegexesOfType.password.regexes;
    const isPasswordValid = passwordRegexes.some((regex) => regex.test(password));

    if (!isPasswordValid) {
      return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
    }
  }

  try {
    const response = await userSignInService({ phone });
    return res
      .status(httpStatus.OK)
      .json({ data: response, status: httpStatus.OK, message: '정상적으로 로그인 되었습니다.' });
  } catch (e) {
    return next(e);
  }
};

export const userLogOutController = async (req: IRequestWithUserData, res: Response, next: NextFunction) => {
  const { userId } = req;

  try {
    await userLogOutService({ userId: Number(userId) });
    return res
      .status(httpStatus.NO_CONTENT)
      .json({ status: httpStatus.NO_CONTENT, message: '정상적으로 로그아웃 되었습니다.' });
  } catch (e) {
    return next(e);
  }
};

export const userPasswordChangeController = async (
  req: IPasswordChangeController,
  res: Response,
  next: NextFunction,
) => {
  const { originPassword, changePassword } = req.body;
  const { userId } = req;

  if (!originPassword) {
    return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
  }

  if (originPassword) {
    const passwordRegexes = registerRegexesOfType.password.regexes;
    const isPasswordValid = passwordRegexes.some((regex) => regex.test(originPassword));
    if (!isPasswordValid) {
      return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
    }
  }

  if (!changePassword) {
    return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
  }

  if (changePassword) {
    const passwordRegexes = registerRegexesOfType.password.regexes;
    const isPasswordValid = passwordRegexes.some((regex) => regex.test(changePassword));
    if (!isPasswordValid) {
      return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
    }
  }

  try {
    await userPasswordChangeService({ originPassword, changePassword, userId: Number(userId) });
    return res.status(httpStatus.OK).json({ status: httpStatus.OK, message: '정상적으로 비밀번호가 변경되었습니다.' });
  } catch (e) {
    return next(e);
  }
};

export const userWithdrawalController = async (req: IWithdrawalController, res: Response, next: NextFunction) => {
  const { password } = req.body;
  const { userId } = req;

  if (!password) {
    return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
  }

  if (password) {
    const passwordRegexes = registerRegexesOfType.password.regexes;
    const isPasswordValid = passwordRegexes.some((regex) => regex.test(password));
    if (!isPasswordValid) {
      return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
    }
  }

  try {
    await userWithdrawalService({ password, userId: Number(userId) });
    return res
      .status(httpStatus.NO_CONTENT)
      .json({ status: httpStatus.NO_CONTENT, message: '정상적으로 회원탈퇴 되었습니다.' });
  } catch (e) {
    return next(e);
  }
};
