export class InvalidFieldError extends Error {
  constructor(field) {
    super(`${field} inválido`);
    this.name = `${field} inválido`;
  }
}
