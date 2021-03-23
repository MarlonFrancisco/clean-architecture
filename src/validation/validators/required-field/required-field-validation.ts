import { ValidationField } from "@/validation/protocols";
import { RequiredFieldError } from "@/validation/errors";

export class RequiredFieldValidation implements ValidationField {
  constructor(readonly fieldName: string) {}

  validate(value: string) {
    return value.length ? null : new RequiredFieldError();
  }
}
