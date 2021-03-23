import { ValidationField } from "@/validation/protocols/validation-field";

export class ValidationFieldSpy implements ValidationField {
  error: Error = null;

  constructor(readonly fieldName: string) {}

  validate(value: string): Error {
    return this.error;
  }
}
