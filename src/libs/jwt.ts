import jwt from 'jsonwebtoken';
import { IJWTTokenData } from '~/@types/utils/jwt';

const { TOKEN_SECRET } = process.env;

export const createToken = (auth: IJWTTokenData) => {
  return jwt.sign(auth, TOKEN_SECRET, { expiresIn: '1m' });
};

export const verifyToken = (token: string) => {
  if (!token) return null;

  try {
    return jwt.verify(token, TOKEN_SECRET, { ignoreExpiration: true }) as IJWTTokenData;
  } catch (error) {
    return null;
  }
};
