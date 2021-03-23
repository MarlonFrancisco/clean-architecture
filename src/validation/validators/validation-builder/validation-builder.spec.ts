import faker from "faker";

import {
  RequiredFieldValidation,
  EmailFieldValidation,
  MinLengthFieldValidation,
  ValidationBuilder,
} from "@/validation/validators";

describe("ValidationBuilder", () => {
  it("should return Required validation", () => {
    const field = faker.database.column();
    const validation = ValidationBuilder.field(field).required().build();

    expect(validation).toEqual([new RequiredFieldValidation(field)]);
  });

  it("should return Email validation", () => {
    const validation = ValidationBuilder.field("email").email().build();

    expect(validation).toEqual([new EmailFieldValidation("email")]);
  });

  it("should return MinLength validation", () => {
    const field = faker.database.column();
    const length = faker.random.number(10);
    const validation = ValidationBuilder.field(field).min(length).build();

    expect(validation).toEqual([new MinLengthFieldValidation(field, length)]);
  });
});
