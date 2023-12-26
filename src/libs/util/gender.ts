import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

export const getGenderToEng = (sex: string): string => {
  if (sex === '남성') {
    return 'man';
  } else if (sex === '여성') {
    return 'female';
  } else {
    throw new ErrorResponse(ERROR_CODE.SEX_TYPE_INVAILD_INPUT);
  }
};
