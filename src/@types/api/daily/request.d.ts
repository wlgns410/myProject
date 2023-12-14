import { IRequestWithUserId } from '~/@types/api/request/request';

export interface IUserDailyCalorieController extends IRequestWithUserId {
  body: {
    foods: FoodItem[];
  };
}

export interface IUserDailyCalorieService {
  foods: FoodItem[];
  userId: number;
}

interface FoodItem {
  food: string;
  quantity: number;
}
