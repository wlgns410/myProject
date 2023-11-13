import ErrorField from './exception/errorField';
import { registerRegexesOfType } from './util/regex';

export const dateValidation = (fieldName: string, date: string, errorFields: ErrorField[]) => {
  const year = Number(date.substring(0, 4));
  const month = Number(date.substring(4, 6));
  const day = Number(date.substring(6, 8));

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLength[1] = 29;
  }

  if (day > monthLength[month - 1]) {
    errorFields.push(new ErrorField(fieldName, date, '잘못된 날짜입니다.'));
  }
};

export const regexValidation = (type: string, value: any, errorFields: ErrorField[]) => {
  if (!(type in registerRegexesOfType)) {
    errorFields.push(new ErrorField(type, value === null || value === undefined ? '' : value, ''));
  }
  const { regexes, msg } = registerRegexesOfType[type];
  for (const regex of regexes) {
    if (value === null || value === undefined) {
      value = '';
    }
    const result = regex.test(value.toString());
    if (!result) {
      errorFields.push(new ErrorField(type, type.indexOf('password') === -1 ? value : 'secret', msg));
    } else if (type === 'birth') {
      dateValidation(type, value, errorFields);
    }
  }
};
