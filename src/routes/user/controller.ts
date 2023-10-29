import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { userSignUpService, userSignUpAuthenticationNumberService } from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import { registerRegexesOfType } from '~/libs/regex';
import { UserType } from '~/libs/enum';
import { ISignUpController, ISignUpAuthNumController } from '~/@types/api/user/request'
import { ISignUpRequest } from '~/@types/api/user/response'

export const userSignUpController = async (req: ISignUpController, res: Response, next: NextFunction) => {
    const {email, password, phone, userType} = req.params;
    if (!email && !password && !phone && !userType) {
        return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
    }

    if (email) {
        const emailRegexes = registerRegexesOfType.email.regexes;
        const isEmailValid = emailRegexes.some(regex => regex.test(email));

        if (!isEmailValid) {
            return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
        }
    }

    if (password) {
        const passwordRegexes = registerRegexesOfType.password.regexes;
        const isPasswordValid = passwordRegexes.some(regex => regex.test(password));

        if (!isPasswordValid) {
            return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
        }
    }

    if (phone) {
        const phoneRegexes = registerRegexesOfType.phone.regexes;
        const isPhoneValid = phoneRegexes.some(regex => regex.test(phone));

        if (!isPhoneValid) {
            return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
        }
    }

    if (!UserType.isValid(userType)) {
        return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
    }

    try {
        const response = await userSignUpService({email, password, phone, userType});
        return res
          .status(httpStatus.CREATED)
          .json({ data: response, status: httpStatus.CREATED, message: '정상적으로 처리되었습니다.' });
      } catch (e) {
        return next(e);
      }
}

export const userSignUpAuthenticationNumberController = async (req: ISignUpAuthNumController, res: Response, next: NextFunction) => {
    const { phone } = req.params;
    if (!phone) {
        return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
    }

    if (phone) {
        const phoneRegexes = registerRegexesOfType.phone.regexes;
        const isPhoneValid = phoneRegexes.some(regex => regex.test(phone));

        if (!isPhoneValid) {
            return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE));
        }
    }

    try {
        const response = await userSignUpAuthenticationNumberService({phone});
        return res
          .status(httpStatus.ACCEPTED)
          .json({ data: response, status: httpStatus.ACCEPTED, message: '정상적으로 처리되었습니다.' });
      } catch (e) {
        return next(e);
      }
}
