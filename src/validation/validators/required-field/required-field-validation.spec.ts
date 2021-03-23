import faker from "faker";

import { RequiredFieldValidation } from "./required-field-validation";
import { RequiredFieldError } from "@/validation/errors";

type SubTypes = {
  sut: RequiredFieldValidation;
};

const makeSut = (): SubTypes => {
  const sut = new RequiredFieldValidation("email");
  return {
    sut,
  };
};

describe("RequiredFieldValidation", () => {
  it("should validation method return an error message", () => {
    const { sut } = makeSut();
    const status = sut.validate("");

    expect(status).toEqual(new RequiredFieldError());
  });

  it("should validation method return none error message", () => {
    const { sut } = makeSut();
    const status = sut.validate(faker.internet.email());

    expect(status).toBeFalsy();
  });
});
