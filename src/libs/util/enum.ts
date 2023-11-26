import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class UserType extends EnumType<UserType>() {
  static readonly Supervisor = new UserType('supervisor', '최고관리자');
  static readonly Employee = new UserType('Employee', '직원');
  static readonly Admin = new UserType('admin', '관리자');
  static readonly Customer = new UserType('customer', '고객');

  private constructor(
    readonly _code: string,
    readonly _name: string,
  ) {
    super();
  }

  // static isValid(userType: string): boolean {
  //   // 유효한 userType 값인지 확인하는 로직 작성
  //   return Object.values(UserType).some((enumValue) => enumValue.code === userType);
  // }
  get code(): string {
    return this._code;
  }
  get name(): string {
    return this._name;
  }
  equals(code: string): boolean {
    return this.code === code;
  }

  toCodeName() {
    return {
      code: this.code,
      name: this.name,
    };
  }
}
