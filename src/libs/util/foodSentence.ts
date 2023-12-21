interface FoodItem {
  food: string;
  quantity: number;
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

export const foodParse = async (sentence: string) => {};
