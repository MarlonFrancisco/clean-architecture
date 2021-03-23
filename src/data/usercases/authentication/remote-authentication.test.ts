import faker from "faker";

import RemoteAuthentication from "./RemoteAuthentication";

import { HttpPostClientSpy } from "@/data/test/mock.http-client";
import { HttpStatusReponse } from "@/data/protocols/http/http-response";
import {
  mockAccountModel,
  mockAuthentication,
} from "@/domain/test/mock-authentication";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnexpectedError } from "@/domain/errors/unexpected-error";
import { AuthenticationParams } from "@/domain/usecases/authentication";
import { AccountModel } from "@/domain/models/account";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();

  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoveAuthentication", () => {
  it("should call HttpPostClient with correct Url", async () => {
    const url = faker.internet.url();

    const { httpPostClientSpy, sut } = makeSut(url);

    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.ok,
    };

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toEqual(url);
  });

  it("should call HttpPostClient with correct body", async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.ok,
    };

    const authenticationParams = mockAuthentication();

    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it("should throw error on invalid credentials on status 401", async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.unauthorized,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it("should throw error on unexpected error on status 400", async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.badRequest,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw error on unexpected error on status 404", async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.notFound,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should throw error on unexpected error on status 500", async () => {
    const { httpPostClientSpy, sut } = makeSut();

    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.serverError,
    };

    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("should return AccountModel on status 200", async () => {
    const { sut, httpPostClientSpy } = makeSut();

    const payload = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusReponse.ok,
      body: payload,
    };

    const response = await sut.auth(mockAuthentication());

    expect(response).toEqual(payload);
  });
});
