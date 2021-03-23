import { ValidationField } from "@/validation/protocols";
import {
  RequiredFieldValidation,
  EmailFieldValidation,
  MinLengthFieldValidation,
} from "@/validation/validators";

export class ValidationBuilder {
  private constructor(
    readonly fieldName: string,
    private validators: ValidationField[]
  ) {}

  static field(fieldName: string) {
    return new ValidationBuilder(fieldName, []);
  }

  required() {
    this.validators.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email() {
    this.validators.push(new EmailFieldValidation(this.fieldName));
    return this;
  }

  min(length: number) {
    this.validators.push(new MinLengthFieldValidation(this.fieldName, length));
    return this;
  }

  build() {
    return this.validators;
  }
}
