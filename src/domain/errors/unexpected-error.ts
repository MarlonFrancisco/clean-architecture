export class UnexpectedError extends Error {
  constructor() {
    super("Request error");
    this.name = "UnexpectedError";
  }
}
