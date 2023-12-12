import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

export const bmrCalculation = (
  height: number,
  weight: number,
  age: number,
  gender: string,
  activity: string,
): number => {
  let bmr: number;

  // Calculate BMR based on gender
  if (gender === 'male') {
    bmr = 66.5 + 13.75 * weight + 5.003 * height - 6.75 * age;
  } else if (gender === 'female') {
    bmr = 655.1 + 9.563 * weight + 1.85 * height - 4.676 * age;
  } else {
    throw new ErrorResponse(ERROR_CODE.SEX_TYPE_INVAILD_INPUT);
  }

  // Apply activity coefficient
  let calories: number;

  switch (activity) {
    case 'sedentary':
      calories = bmr * 1.2;
      break;
    case 'light':
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

  return calories;
};
