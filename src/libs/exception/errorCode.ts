import { IErrorCode } from '~/@types/exception';

export class ErrorCode {
  status: number;
  message: string;
  code: string;

  constructor({ status, message, code }: IErrorCode) {
    this.status = status;
    this.message = message;
    this.code = code;
  }

  /**
   * @param {Number} status
   * @param {String} message
   * @param {String} code
   */
  static createErrorCode(status: number, message: string, code: string) {
    return new ErrorCode({ status, message, code });
  }
}

const $ = ErrorCode.createErrorCode;

const ERROR_CODE = {
};

export default ERROR_CODE;
