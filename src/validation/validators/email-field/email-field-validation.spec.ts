import faker from "faker";

import { EmailFieldValidation } from "./email-field-validation";
import { InvalidFieldError } from "@/validation/errors";

type SubTypes = {
  sut: EmailFieldValidation;
};

const makeSut = (): SubTypes => {
  const sut = new EmailFieldValidation("email");

  return {
    sut,
  };
};

describe("EmailFieldValidation", () => {
  it("should validation method return an error message", () => {
    const { sut } = makeSut();
    const status = sut.validate(faker.random.words(12));

    expect(status).toEqual(new InvalidFieldError("email"));
  });

  it("should validation method return none error message", () => {
    const { sut } = makeSut();
    const status = sut.validate(faker.internet.email());

    expect(status).toBeFalsy();
  });
});
