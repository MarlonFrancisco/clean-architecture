import faker from "faker";

import { MinLengthFieldValidation } from "./min-length-field-validation";
import { InvalidFieldError } from "@/validation/errors";

type SubTypes = {
  sut: MinLengthFieldValidation;
  field: string;
};

const makeSut = (minLength): SubTypes => {
  const field = faker.database.column();
  const sut = new MinLengthFieldValidation(field, minLength);
  return { sut, field };
};

describe("MinLengthField", () => {
  it("should validation method return an error message", () => {
    const { sut, field } = makeSut(5);
    const status = sut.validate(faker.random.alphaNumeric(4));

    expect(status).toEqual(new InvalidFieldError(field));
  });

  it("should validation method return none error message", () => {
    const { sut } = makeSut(5);
    const status = sut.validate(faker.random.alphaNumeric(5));

    expect(status).toBeFalsy();
  });
});
