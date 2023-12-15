import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

interface FoodItem {
  food: string;
  quantity: number;
}

export const foodSentence = async (foods: FoodItem[]): Promise<string> => {
  if (!foods || foods.length === 0) {
    throw new ErrorResponse(ERROR_CODE.FOODS_INVAILD_INPUT);
  }

  const foodDescriptions: string[] = [];

  for (const food of foods) {
    for (const [foodName, quantity] of Object.entries(food)) {
      const description = `${foodName}의 ${quantity}개의 탄수화물, 단백질, 지방과 그리고 칼로리를 알려줘`;
      foodDescriptions.push(description);
    }
  }

  return foodDescriptions.join('\n');
};
