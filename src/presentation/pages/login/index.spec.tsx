import { render, fireEvent } from "@testing-library/react";
import faker from "faker";

import { ValidationSpy } from "@/presentation/test/mock-validation";
import {
  ValidationEmailMessages,
  ValidationPasswordMessages,
} from "@/presentation/protocols/validation";

import Login from "./index";
import { AuthenticationSpy } from "@/presentation/test/mock-authentication";

const makeSut = () => {
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();

  const sut = render(
    <Login validation={validationSpy} authentication={authenticationSpy} />
  );
  return {
    sut,
    validationSpy,
    authenticationSpy,
  };
};

describe("Login page", () => {
  const sendForm = (sut) => {
    const submitButton = sut.getByText("Enviar");
    return fireEvent.click(submitButton);
  };

  it("should render initial state correctly", () => {
    const { sut } = makeSut();

    const formStatusContainer = sut.getByTestId("form-status");

    expect(formStatusContainer.childElementCount).toBe(0);
  });

  it("should call Validation with correct email", () => {
    const { sut, validationSpy } = makeSut();

    const emailInputElement = sut.getByPlaceholderText("email");

    const generatedFakerEmail = faker.internet.email();

    fireEvent.input(emailInputElement, {
      target: {
        value: generatedFakerEmail,
      },
    });

    sendForm(sut);

    expect(validationSpy.errorMessage).toBeNull();
  });

  it("should call Validation with correct password", () => {
    const { sut, validationSpy } = makeSut();

    const passwordInputElement = sut.getByPlaceholderText("password");

    const generatedFakerPassword = faker.internet.password();

    fireEvent.input(passwordInputElement, {
      target: {
        value: generatedFakerPassword,
      },
    });

    sendForm(sut);
    expect(validationSpy.errorMessage).toBeNull();
  });

  it("should show error message on input email invalid", () => {
    const { sut, validationSpy } = makeSut();

    validationSpy.errorMessage = ValidationEmailMessages.invalid;

    const emailInput = sut.getByPlaceholderText("email");

    fireEvent.input(emailInput, {
      target: {
        value: faker.internet.email(),
      },
    });

    sendForm(sut);

    const emailError = sut.getByTestId("textfield-email-error");

    expect(emailError.innerHTML).toBe(validationSpy.errorMessage);
  });

  it("should show error message on input password invalid", () => {
    const { sut, validationSpy } = makeSut();

    validationSpy.errorMessage = ValidationPasswordMessages.invalid;

    const passwordInput = sut.getByPlaceholderText("password");

    fireEvent.input(passwordInput, {
      target: {
        value: faker.internet.password(),
      },
    });

    sendForm(sut);

    const passwordError = sut.getByTestId("textfield-password-error");

    expect(passwordError.innerHTML).toBe(validationSpy.errorMessage);
  });

  it("should call authentication with correct params", () => {
    const { sut, authenticationSpy } = makeSut();

    const passwordInput = sut.getByPlaceholderText("password");
    const emailInput = sut.getByPlaceholderText("email");

    const params = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    fireEvent.input(emailInput, {
      target: {
        value: params.email,
      },
    });

    fireEvent.input(passwordInput, {
      target: {
        value: params.password,
      },
    });

    sendForm(sut);

    expect(authenticationSpy.params).toEqual(params);
  });
});
