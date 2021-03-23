import { InvalidFieldError } from "@/validation/errors";
import { ValidationField } from "@/validation/protocols";

export class MinLengthFieldValidation implements ValidationField {
  constructor(readonly fieldName: string, private minLength: number) {}

  validate(value: string): Error {
    return value.length >= this.minLength
      ? null
      : new InvalidFieldError(this.fieldName);
  }
}
