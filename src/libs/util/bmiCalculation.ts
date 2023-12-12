export const bmiCalculation = (height:number, weight:number): number => {
    // BMI 계산: 체중(kg) / (키(m) * 키(m))
    const bmi = weight / ((height / 100) * (height / 100));
    return bmi;
};

export const bmiTypeCalculation = (height:number, weight:number): string => {

    const currentBMI = bmiCalculation(height, weight)
  
    // BMI에 따른 분류
    let bmiType: string;
    if (currentBMI < 17) {
      bmiType = 'muscular';
    } else if (currentBMI >= 17 && currentBMI < 19.99) {
      bmiType = 'slim';
    } else if (currentBMI >= 20 && currentBMI < 24.99) {
      bmiType = 'normal';
    } else {
      bmiType = 'fat';
    }
    return bmiType;
};
  
// 대략적인 목표 bmi 설정 후 그 몸무게와 현재 몸무게 차이 계산
export const calculateWeightDifference = (height: number, weight: number) => {

    const muscularBMI = 15
    const smimBMI = 19
    const normalBMI = 22

    const muscularWeight = muscularBMI * Math.pow(height / 100, 2);
    const slimWeight = smimBMI * Math.pow(height / 100, 2);
    const normalWeight = normalBMI * Math.pow(height / 100, 2);

    // 몸무게 차이는 정수 2자리 + 소수점 1자리 최대 3자리
    const decimalPlaces = 1; 
    const integerPlaces = 2;

    const muscularDifference = (muscularWeight - weight).toFixed(decimalPlaces).toString().padStart(decimalPlaces + integerPlaces, '0');
    const slimDifference = (slimWeight - weight).toFixed(decimalPlaces).toString().padStart(decimalPlaces + integerPlaces, '0');
    const normalDifference = (normalWeight - weight).toFixed(decimalPlaces).toString().padStart(decimalPlaces + integerPlaces, '0');
  
    return {muscularDifference, slimDifference, normalDifference};
};
