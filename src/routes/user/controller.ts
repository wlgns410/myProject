import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// import  from './service';

export const userSignUpController = async (req: Request, res: Response, next: NextFunction) => {

    // try {
    //     const response = await userSignUpService(req.body);
    //     return res
    //       .status(httpStatus.CREATED)
    //       .json({ data: response, status: httpStatus.CREATED, message: '정상적으로 처리되었습니다.' });
    //   } catch (e) {
    //     return next(e);
    //   }
}