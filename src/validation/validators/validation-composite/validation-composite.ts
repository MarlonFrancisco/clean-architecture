import { ValidationField } from "@/validation/protocols/validation-field";
import { Validation } from "@/presentation/protocols/validation";

export class ValidationComposite implements Validation {
  constructor(readonly validatorsFields: ValidationField[]) {}

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validatorsFields.filter(
      (v) => v.fieldName === fieldName
    );

    for (const validator of validators) {
      const error = validator.validate(fieldValue);

      if (error) {
        return error.message;
      }
    }
  }
}
