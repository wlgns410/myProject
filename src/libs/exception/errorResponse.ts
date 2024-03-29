import { ErrorCode } from './createErrorCode';
import ErrorField from './errorField';

class ErrorResponse {
  errorCode: ErrorCode;
  fieldErrors: ErrorField[];

  /**
   * @param {ErrorCode} errorCode instance
   * @param {ErrorField[]} fieldErrors
   */
  constructor(errorCode: ErrorCode, fieldErrors: ErrorField | ErrorField[] = []) {
    this.errorCode = errorCode;
    this.fieldErrors = Array.isArray(fieldErrors) ? fieldErrors : [fieldErrors];
  }
}

export default ErrorResponse;
