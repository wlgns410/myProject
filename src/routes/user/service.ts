import { UserRepository } from '~/database/repository';
import { ISignUpService } from '~/@types/api/user/request'

export const userSignUpService= async ({
    email,password,phone,userType,
}: ISignUpService) =>{
    // DB에 전화번호 있는지 파악
    const phoneExists = await userRepository.isPhoneExists(phone); // typeorm 0.3 버전에 따라 코드 수정 필요
    if (phoneExists) {
        // 이미 해당 전화번호가 존재할 때의 처리
        // 예를 들어, 에러를 throw하거나 다른 처리를 수행할 수 있습니다.
    }

    // redis에 인증번호, 전화번호 있는지 파악
    // nickname 생성
    // DB 저장
    // create라서 리턴은 없음.
};
