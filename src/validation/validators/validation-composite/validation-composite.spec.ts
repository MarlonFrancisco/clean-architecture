import faker from "faker";

import { ValidationComposite } from "./validation-composite";
import { ValidationFieldSpy } from "@/validation/test/mock-validation";

type SutTypes = {
  sut: ValidationComposite;
  validators: ValidationFieldSpy[];
  fieldName: string;
};

const makeSut = () => {
  const field = faker.database.column();

  const validators = [
    new ValidationFieldSpy(field),
    new ValidationFieldSpy(field),
  ];
  const sut = new ValidationComposite(validators);

  return {
    sut,
    validators,
    field,
  };
};

describe("ValidationComposite", () => {
  it("should return first error in validation fail", () => {
    const { sut, validators, field } = makeSut();

    const errorMessage = faker.random.words();

    validators[0].error = new Error(errorMessage);
    validators[1].error = new Error(faker.random.words());

    const error = sut.validate(field, faker.random.words());

    expect(error).toBe(errorMessage);
  });

  it("should return none error", () => {
    const { sut, field } = makeSut();

    const error = sut.validate(field, faker.random.words());

    expect(error).toBeFalsy();
  });
});
