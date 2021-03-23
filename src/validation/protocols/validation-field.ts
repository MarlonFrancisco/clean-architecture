export interface ValidationField {
  fieldName: string;
  validate(fieldValue: string): Error;
}
