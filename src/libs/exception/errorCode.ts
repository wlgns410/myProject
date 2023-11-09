import { ErrorCode } from './createErrorCode';

const $ = ErrorCode.createErrorCode;

const ERROR_CODE = {
  PAGE_NOT_FOUND: $(404, 'PAGE NOT FOUND', 'COMMON001'),
  INVALID_INPUT_VALUE: $(400, 'INVALID INPUT VALUE', 'COMMON002'),
  SESSION_HAS_EXPIRED: $(401, '세션이 만료되었습니다.', 'COMMON003'),
  CONNECTION_HAS_LOST: $(401, '연결이 끊겼습니다.', 'COMMON004'),
  NOT_ALLOWED_BY_CORS: $(401, '허용되지 않는 도메인입니다.', 'DW3A7Z'),
  INTERNAL_SERVER_ERROR: $(500, 'Internal Server Error', 'COMMON005'),
  PRIVATE_PATH: $(404, 'PAGE NOT FOUND', 'COMMON006'), // 403대신 404로 응답함으로써 PRIVATE을 보장한다.
  FORBIDDEN: $(403, '권한이 없습니다.', 'COMMON007'),
  UNAUTHORIZED: $(401, '로그인 후 이용해 주세요.', 'COMMON008'),
  NOT_FOUND_USER: $(404, '가입하지 않은 아이디입니다.', 'COMMON009'),

  // SignUp
  ALREADY_SIGNUP_USER: $(403, '이미 회원가입한 아이디입니다.', 'SIGNUP001'),
  EMAIL_INVAILD_INPUT: $(400, '이메일의 형식에 맞게 입력해주세요.', 'SIGNUP002'),
  PASSWORD_INVAILD_INPUT: $(400, '비밀번호는 6자 이상 15자 이하의 영문+숫자이어야 합니다.', 'SIGNUP003'),
  PHONE_INVAILD_INPUT: $(400, '핸드폰의 형식에 맞게 입력해주세요.', 'SIGNUP004'),
  PHONE_AUTH_INVAILD_INPUT: $(400, '핸드폰 인증번호의 형식에 맞게 입력해주세요.', 'SIGNUP005'),
  USER_TYPE_INVAILD_INPUT: $(400, '유저 타입의 형식에 맞게 입력해주세요.', 'SIGNUP006'),
  NOT_FOUND_REDIS_SESSION_USER: $(401, '인증번호 데이터가 존재하지 않습니다.', 'SIGNUP007'),
  NOT_MATCH_SESSION_USER_PHONE: $(401, '인증번호를 다시 발급해주세요', 'SIGNUP008'),

  // SignIn
  NOT_EXACT_PHONE_OR_PASSWORD: $(400, '전화번호나 비밀번호가 일치하지 않습니다.', 'SIGNIN001'),
  TOKEN_NOT_CREATE: $(403, '토큰이 발급되지 않았습니다.', 'SIGNIN002'),
};

export default ERROR_CODE;
