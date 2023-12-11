class ErrorField {
  field: string;
  value: string;
  reason: string;

  /**
   * @param {String} field filed type
   * @param {String} value
   * @param {String} reason
   */
  constructor(field: string, value: string = '', reason: string) {
    this.field = field;
    this.value = field.substring(0, 2) === 'pw' ? 'secret' : value;
    this.reason = reason;
  }
}

export default ErrorField;
