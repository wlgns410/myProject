import { IRequestWithUserData, IRequestWithUserId } from '~/@types/api/request/request';

interface FoodItem {
  food: string;
  quantity: number;
}
export interface IUserDailyCalorieController extends IRequestWithUserData {
  body: {
    foods: FoodItem[];
  };
}

export interface IUserDailyCalorieService {
  foods: FoodItem[];
  userId: number;
}

export interface IUserEatingAllDayController extends IRequestWithUserId {
  userId: number;

  params: {
    bmiId: string;
  };

  query: {
    startDate: string;
    endDate: string;
  };
}

export interface IUserEatingAllDayService {
  userId: number;
  bmiId: number;
  startDate: string;
  endDate: string;
}

export interface IUserEatingOneController extends IRequestWithUserId {
  userId: number;

  params: {
    dailyFoodId: string;
  };
}

export interface IUserEatingOneService {
  userId: number;
  dailyFoodId: number;
}
