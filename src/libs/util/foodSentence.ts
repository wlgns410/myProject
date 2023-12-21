interface FoodItem {
  food: string;
  quantity: number;
}

interface NutritionInfo {
  carbohydrates: string;
  protein: string;
  lipid: string;
  calorie: string;
}

export const foodSentence = async (foods: FoodItem[]): Promise<string> => {
  const foodDescriptions: string[] = [];

  for (const food of foods) {
    for (const [foodName, quantity] of Object.entries(food)) {
      const description = `${foodName}의 ${quantity}개의 탄수화물, 단백질, 지방과 그리고 칼로리를 알려줘`;
      foodDescriptions.push(description);
    }
  }

  return foodDescriptions.join('\n');
};

// chatgpt에서 범위값으로 리턴할때도 있기 때문에 범위값일 경우 중간값 리턴
const calculateRangeValue = (min: string, max?: string): number => {
  const minValue = parseInt(min, 10);
  const maxValue = max ? parseInt(max, 10) : minValue;

  // min과 max가 주어지지 않은 경우 또는 값이 없는 경우 min 값을 반환합니다.
  return isNaN(minValue) ? 0 : (minValue + maxValue) / 2;
};

export const parseGPTSentnece = async (sentence: string): Promise<NutritionInfo> => {
  const response = JSON.parse(sentence);

  let carbohydrates = 0;
  let protein = 0;
  let lipid = 0;
  let calorie = 0;

  // 각 메시지에 대해 반복하면서 값을 추출합니다.
  for (const message of response.choices) {
    if (message.role === 'assistant') {
      // 각각의 정보를 포함하는 정규 표현식 패턴을 작성 : 총 5자리(소수점 1자리포함)
      const pattern = /(\d+)-*(\d*)g.*?(\d+)-*(\d*)g.*?(\d+)-*(\d*)g.*?(\d+)-*(\d*)kcal/;

      // 정규 표현식을 사용하여 문자열에서 값을 추출합니다.
      const matches = message.content.match(pattern);

      // 추출된 값이 있다면 누적합니다.
      if (matches) {
        carbohydrates += calculateRangeValue(matches[1], matches[2]);
        protein += calculateRangeValue(matches[3], matches[4]);
        lipid += calculateRangeValue(matches[5], matches[6]);
        calorie += calculateRangeValue(matches[7], matches[8]);
      }
    }
  }

  // DB에 저장될때 string 타입으로 설정했음
  return {
    carbohydrates: carbohydrates.toFixed(1),
    protein: protein.toFixed(1),
    lipid: lipid.toFixed(1),
    calorie: calorie.toFixed(1),
  };
};
