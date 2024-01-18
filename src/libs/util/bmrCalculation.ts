import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

export const bmrCalculation = (height: number, weight: number, age: number, sex: string, activityType: string) => {
  let bmr: number;

  // Calculate BMR based on gender
  if (sex === 'man') {
    bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
  } else if (sex === 'woman') {
    bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  } else {
    throw new ErrorResponse(ERROR_CODE.SEX_TYPE_INVAILD_INPUT);
  }

  // Apply activity coefficient
  let calories: number;

  switch (activityType) {
    case 'veryInactive':
      calories = bmr * 1.2;
      break;
    case 'inactive':
      calories = bmr * 1.375;
      break;
    case 'moderate':
      calories = bmr * 1.55;
      break;
    case 'active':
      calories = bmr * 1.725;
      break;
    case 'veryActive':
      calories = bmr * 1.9;
      break;
    default:
      throw new ErrorResponse(ERROR_CODE.ACTIVITY_TYPE_INVAILD_INPUT);
  }

  return { calories, bmr };
};
