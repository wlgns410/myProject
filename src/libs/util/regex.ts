export const registerRegexesOfType = {
  email: {
    regexes: [/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/],
    msg: '이메일의 형식에 맞게 입력해주세요.',
  },
  password: {
    regexes: [/^(((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]))|((?=.*\d)(?=.*[a-z]))|((?=.*\d)(?=.*[A-Z]))).{6,15}$/],
    msg: '비밀번호는 6자 이상 15자 이하의 영문+숫자이어야 합니다.',
  },
  phone: {
    regexes: [/^01\d\d{3,4}\d{4}$/],
    msg: '핸드폰 번호의 양식에 맞게 입력해주세요.',
  },
  phoneAuth: {
    regexes: [/^\d{4}$/],
    msg: '핸드폰 인증번호의 형식에 맞게 입력해주세요.',
  },
  height: {
    regexes: [/^(5[0-9]|[6-9]\d|1[0-9]\d|2[0-9]\d|3[0-4]\d)$/],
    msg: '키는 50이상 350 미만의 숫자로 입력해주세요.',
  },
  weight: {
    regexes: [/^(3[0-9]\d|[4-9]\d|1\d\d|2[0-9]\d|300)$/],
    msg: '몸무게는 30이상 300 미만의 숫자로 입력해주세요.',
  },
  birth: {
    regexes: [/^\d{4}\d{2}\d{2}$/],
    msg: '생년월일를 제대로 입력해 주세요.',
  },
  date: {
    regexes: [/^\d{4}-\d{2}-\d{2}$/],
    msg: '날짜를 제대로 입력해주세요.',
  },
};
