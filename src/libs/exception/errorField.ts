class ErrorField {
  field: string;
  value: string;
  reason: string;

  constructor(field: string, value: string = '', reason: string) {
    this.field = field;
    this.value = field.substring(0, 2) === 'pw' ? 'secret' : value;
    this.reason = reason;
  }
}

export default ErrorField;
