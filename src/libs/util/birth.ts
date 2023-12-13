import dayjs from 'dayjs';

export const getCurrentAgeToNumber = (birth: string): number => {
  // 현재 날짜 구하기
  const currentDate = dayjs();

  // 입력된 생년월일 문자열을 날짜 객체로 변환
  const birthDate = dayjs(birth, { format: 'YYYYMMDD' });

  // 현재 나이 계산
  const age = currentDate.year() - birthDate.year();

  // 생일이 지났는지 체크
  if (
    currentDate.month() < birthDate.month() ||
    (currentDate.month() === birthDate.month() && currentDate.date() < birthDate.date())
  ) {
    // 생일이 지나지 않았으면 나이에서 1을 빼줌
    return age - 1;
  }

  return Number(age);
};
