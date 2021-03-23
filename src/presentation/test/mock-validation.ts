import { Validation } from "@/presentation/protocols/validation";

export class ValidationSpy implements Validation {
  errorMessage: string = null;

  validate(fieldName: string, fieldValue: string): string {
    return this.errorMessage;
  }
}
