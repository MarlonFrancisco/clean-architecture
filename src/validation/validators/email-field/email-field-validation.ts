import { ValidationField } from "@/validation/protocols";
import { InvalidFieldError } from "@/validation/errors";

export class EmailFieldValidation implements ValidationField {
  private validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(readonly fieldName: string) {}

  validate(value: string): Error {
    return this.validEmailRegex.test(value)
      ? null
      : new InvalidFieldError(this.fieldName);
  }
}
