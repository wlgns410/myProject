import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

import userSignUpService from './service';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorField from '~/libs/exception/errorField';
import ErrorResponse from '~/libs/exception/errorResponse';
import { verifyToken } from '~/libs/jwt';
import { regexValidation } from '~/libs/validation';

export const userSignUpController = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return next(new ErrorResponse(ERROR_CODE.UNAUTHORIZED));
      }

    // try {
    //     const response = await userSignUpService(req.body);
    //     return res
    //       .status(httpStatus.CREATED)
    //       .json({ data: response, status: httpStatus.CREATED, message: '정상적으로 처리되었습니다.' });
    //   } catch (e) {
    //     return next(e);
    //   }
}