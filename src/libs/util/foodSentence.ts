import { FoodItem } from '~/@types/utils/sentence/request';
import { NutritionInfo, GptResponse } from '~/@types/utils/sentence/response';
import ERROR_CODE from '~/libs/exception/errorCode';
import ErrorResponse from '~/libs/exception/errorResponse';

export const foodSentence = async (foods: FoodItem[]): Promise<string> => {
  const foodDescriptions: string[] = [];

  for (const food of foods) {
    const description = `${food.food} ${food.quantity}개의 탄수화물, 단백질, 지방과 그리고 칼로리를 알려줘`;
    foodDescriptions.push(description);
  }
  return foodDescriptions.join('\n');
};

export const parseGPTSentence = async (openAIResponse: GptResponse): Promise<NutritionInfo> => {
  const message = openAIResponse; // 배열이 아니므로 직접 참조

  if (message.role === 'assistant') {
    const content = message.content;

    const patternCarbohydrate = /\s*탄수화물:\s*(?:약|대략)?\s*(\d+)(?:-*(\d*))?g/;
    const proteinPattern = /\s*단백질:\s*(?:약|대략)?\s*(\d+)(?:-*(\d*))?g/;
    const lipidPattern = /\s*지방:\s*(?:약|대략)?\s*(\d+)(?:-*(\d*))?g/;
    const caloriePattern = /\s*칼로리:\s*(?:약|대략)?\s*(\d+)(?:-*(\d*))?kcal/;

    // 캡처 그룹을 사용하여 숫자만 추출
    const extractNumber = (match: RegExpMatchArray) => (match ? match[1] : 0);

    const carbohydrate = extractNumber(content.match(patternCarbohydrate));
    const protein = extractNumber(content.match(proteinPattern));
    const lipid = extractNumber(content.match(lipidPattern));
    const calorie = extractNumber(content.match(caloriePattern));

    return {
      carbohydrate: String(carbohydrate),
      protein: String(protein),
      lipid: String(lipid),
      calorie: String(calorie),
    };
  } else {
    throw new ErrorResponse(ERROR_CODE.INVAILD_GPT_PARSE);
  }
};
