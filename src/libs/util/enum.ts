import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class UserType extends EnumType<UserType>() {
  static readonly supervisor = new UserType('supervisor', '최고관리자');
  static readonly employee = new UserType('employee', '직원');
  static readonly admin = new UserType('admin', '관리자');
  static readonly customer = new UserType('customer', '고객');

  private constructor(
    readonly _code: string,
    readonly _name: string,
  ) {
    super();
  }

  static isValid(userType: string): boolean {
    // 유효한 userType 값인지 확인하는 로직 작성
    return (this.values() as UserType[]).some((enumValue) => enumValue.code === userType);
  }

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

@Enum('code')
export class BodyType extends EnumType<BodyType>() {
  static readonly muscular = new BodyType('muscular', '근육체형');
  static readonly slim = new BodyType('slim', '마른체형');
  static readonly normal = new BodyType('normal', '보통체형');
  static readonly fat = new BodyType('fat', '살집있는체형');

  private constructor(
    readonly _code: string,
    readonly _name: string,
  ) {
    super();
  }

  static isValid(bodyType: string): boolean {
    // 유효한 bodyType 값인지 확인하는 로직 작성
    return (this.values() as BodyType[]).some((enumValue) => enumValue.code === bodyType);
  }

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

@Enum('code')
export class SexType extends EnumType<SexType>() {
  static readonly man = new SexType('man', '남성');
  static readonly woman = new SexType('woman', '여성');

  private constructor(
    readonly _code: string,
    readonly _name: string,
  ) {
    super();
  }

  static isValid(sex: string): boolean {
    // 유효한 bodyType 값인지 확인하는 로직 작성
    return (this.values() as BodyType[]).some((enumValue) => enumValue.code === sex);
  }

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
