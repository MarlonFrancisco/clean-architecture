export interface Validation {
  errorMessage?: string;

  validate(fieldName: string, fieldValue: string): string;
}

export enum ValidationEmailMessages {
  required = "Campo obrigatório",
  invalid = "Email inválido",
}

export enum ValidationPasswordMessages {
  required = "Campo obrigatório",
  invalid = "Senha inválida",
}
