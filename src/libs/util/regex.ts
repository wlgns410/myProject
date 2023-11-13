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
    }
}
