import { Enum, EnumType } from 'ts-jenum';

@Enum('userType')
export class UserType extends EnumType<UserType>() {
  static readonly Supervisor = new UserType('supervisor', '최고관리자');
  static readonly Employee = new UserType('Employee', '직원');
  static readonly Admin = new UserType('admin', '관리자');
  static readonly Customer = new UserType('customer', '고객');

  private constructor(
    readonly code: string,
    readonly text: string,
  ) {
    super();
  }

  static isValid(userType: string): boolean {
    // 유효한 userType 값인지 확인하는 로직 작성
    return Object.values(UserType).some((enumValue) => enumValue.code === userType);
  }
}
