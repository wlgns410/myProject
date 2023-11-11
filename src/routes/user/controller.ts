import { NextFunction, Response, Request } from 'express';
import httpStatus from 'http-status';
import { userSignUpService, userSignUpAuthenticationNumberService, userSignInService, userLogOutService, userPasswordChangeService } from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { registerRegexesOfType } from '~/libs/regex';
import { UserType } from '~/libs/enum';
import { ISignUpController, ISignUpAuthNumController, ISignInController, IPasswordChangeController } from '~/@types/api/user/request'

export const userSignUpController = async (req: ISignUpController, res: Response, next: NextFunction) => {
    const {email, password, phone, userType} = req.body;
    if (!email && !password && !phone && !userType) {
        return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
    }

    if (email) {
        const emailRegexes = registerRegexesOfType.email.regexes;
        const isEmailValid = emailRegexes.some(regex => regex.test(email));

        if (!isEmailValid) {
            return next(new ErrorResponse(ERROR_CODE.EMAIL_INVAILD_INPUT));
        }
    }

    if (password) {
        const passwordRegexes = registerRegexesOfType.password.regexes;
        const isPasswordValid = passwordRegexes.some(regex => regex.test(password));

        if (!isPasswordValid) {
            return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
        }
    }

    if (phone) {
        const phoneRegexes = registerRegexesOfType.phone.regexes;
        const isPhoneValid = phoneRegexes.some(regex => regex.test(phone));

        if (!isPhoneValid) {
            return next(new ErrorResponse(ERROR_CODE.PHONE_INVAILD_INPUT));
        }
    }

    if (!UserType.isValid(userType)) {
        return next(new ErrorResponse(ERROR_CODE.USER_TYPE_INVAILD_INPUT));
    }

    try {
        await userSignUpService({email, password, phone, userType});
        return res
          .status(httpStatus.CREATED)
          .json({ status: httpStatus.CREATED, message: '정상적으로 회원가입 되었습니다.' });
      } catch (e) {
        return next(e);
      }
}

export const userSignUpAuthenticationNumberController = async (req: ISignUpAuthNumController, res: Response, next: NextFunction) => {
    const { phone } = req.body;
    if (!phone) {
        return next(new ErrorResponse(ERROR_CODE.PHONE_INVAILD_INPUT));
    }

    if (phone) {
        const phoneRegexes = registerRegexesOfType.phone.regexes;
        const isPhoneValid = phoneRegexes.some(regex => regex.test(phone));

        if (!isPhoneValid) {
            return next(new ErrorResponse(ERROR_CODE.PHONE_INVAILD_INPUT));
        }
    }

    try {
        const response = await userSignUpAuthenticationNumberService({phone});
        return res
          .status(httpStatus.ACCEPTED)
          .json({ data: response, status: httpStatus.ACCEPTED, message: '정상적으로 인증번호가 발급되었습니다.' });
      } catch (e) {
        return next(e);
      }
}

export const userSignInController = async (req: ISignInController, res: Response, next: NextFunction) => {
    const { phone, password } = req.body;
    if (!phone) {
        return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
    }

    if (phone) {
        const phoneRegexes = registerRegexesOfType.phone.regexes;
        const isPhoneValid = phoneRegexes.some(regex => regex.test(phone));

        if (!isPhoneValid) {
            return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
        }
    }

    if (!password) {
        return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
    }

    if (password) {
        const passwordRegexes = registerRegexesOfType.password.regexes;
        const isPasswordValid = passwordRegexes.some(regex => regex.test(password));

        if (!isPasswordValid) {
            return next(new ErrorResponse(ERROR_CODE.NOT_EXACT_PHONE_OR_PASSWORD));
        }
    }

    try {
        const response = await userSignInService({phone});
        return res
          .status(httpStatus.OK)
          .json({ data: response, status: httpStatus.OK, message: '정상적으로 로그인 되었습니다.' });
      } catch (e) {
        return next(e);
      }
}

export const userLogOutController = async (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization.split('Bearer ')[1];

    req.logout((err) => {
        if (err) {
          // 로그아웃 중 에러 처리
          return next(err);
        }

        userLogOutService({ token }).then(() => {
            return res
              .status(httpStatus.NO_CONTENT)
              .json({status: httpStatus.NO_CONTENT, message: '정상적으로 로그아웃 되었습니다.' }).end();
        }).catch((e) => {
            return next(e);
        });
      });
}

export const userPasswordChangeController = async (req: IPasswordChangeController, res: Response, next: NextFunction) => {
    const { originPassword, changePassword } = req.body;
    const { userId } = req;

    if (!originPassword) {
        return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
    }

    if (originPassword) {
        const passwordRegexes = registerRegexesOfType.password.regexes;
        const isPasswordValid = passwordRegexes.some(regex => regex.test(originPassword));
        if (!isPasswordValid) {
            return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
        }
    }

    if (!changePassword) {
        return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
    }

    if (changePassword) {
        const passwordRegexes = registerRegexesOfType.password.regexes;
        const isPasswordValid = passwordRegexes.some(regex => regex.test(changePassword));
        if (!isPasswordValid) {
            return next(new ErrorResponse(ERROR_CODE.PASSWORD_INVAILD_INPUT));
        }
    }

    try {
        await userPasswordChangeService({originPassword, changePassword, userId: Number(userId)});
        return res
          .status(httpStatus.OK)
          .json({ status: httpStatus.OK, message: '정상적으로 비밀번호가 변경되었습니다.' });
      } catch (e) {
        return next(e);
      }

}