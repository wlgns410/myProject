import { NextFunction, Response, Request } from 'express';

import { IJWTTokenData } from '~/@types/utils/jwt';
import { IRequestWithUserInfo } from '~/@types/api/request/request';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';
import jwt from 'jsonwebtoken';
import redisCli from '~/config/redis';
import { promisify } from 'util';

// global로 쓰면 dotenv에서 못가져와서 함수로 secret 나중에 가져옴
export const logTokenSecret = () => {
  const { TOKEN_ACCESS_SECRET, TOKEN_REFRESH_SECRET } = process.env;
  return { TOKEN_ACCESS_SECRET, TOKEN_REFRESH_SECRET };
};

export const createToken = (auth: IJWTTokenData) => {
  const { TOKEN_ACCESS_SECRET, TOKEN_REFRESH_SECRET } = logTokenSecret();

  const accessToken = jwt.sign(auth, TOKEN_ACCESS_SECRET, { algorithm: 'HS256', expiresIn: '1M' });
  const refreshToken = jwt.sign({}, TOKEN_REFRESH_SECRET, { algorithm: 'HS256', expiresIn: '365d' });

  return { accessToken, refreshToken };
};

export const verifyToken = async (token: string) => {
  const { TOKEN_ACCESS_SECRET } = logTokenSecret();
  if (!token) return null;

  const verifyAsync = promisify(jwt.verify) as (
    token: string,
    secretOrPublicKey: jwt.Secret,
    options: jwt.VerifyOptions,
  ) => Promise<{} | string>;

  try {
    // 여기서 만료시간 무시하면 위에서 토큰 시간 설정한게 의미없음
    const verifiedData = await verifyAsync(token, TOKEN_ACCESS_SECRET, { ignoreExpiration: false });

    // Now perform a more specific type assertion
    return verifiedData as IJWTTokenData;
  } catch (error) {
    return null;
  }
};
export const refreshVerifyToken = async (token: string, userId: number) => {
  const { TOKEN_REFRESH_SECRET } = logTokenSecret();
  const getAsync = promisify(redisCli.get).bind(redisCli);
  if (!token) return null;

  try {
    const data = await getAsync(userId); // refresh token 가져오기
    if (token === data) {
      try {
        return jwt.verify(token, TOKEN_REFRESH_SECRET);
      } catch (err) {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

export const tokenValidation = async (req: IRequestWithUserInfo, _: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(new ErrorResponse(ERROR_CODE.UNAUTHORIZED));
  }

  const token: string = req.headers.authorization.split('Bearer ')[1];
  const isVerified = await verifyToken(token);

  if (!isVerified) {
    return next(new ErrorResponse(ERROR_CODE.UNAUTHORIZED));
  }

  req.userId = isVerified.id;
  req.sex = isVerified.sex;
  req.birth = isVerified.birth;
  next();
};

export const logoutToken = () => {
  const { TOKEN_ACCESS_SECRET, TOKEN_REFRESH_SECRET } = logTokenSecret();
  jwt.sign({ type: 'logout' }, TOKEN_REFRESH_SECRET, { expiresIn: '0s' });
  return jwt.sign({ type: 'logout' }, TOKEN_ACCESS_SECRET, { expiresIn: '0s' });
};
