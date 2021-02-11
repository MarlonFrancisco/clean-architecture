import faker from "faker";

import RemoteAuthentication from "./RemoteAuthentication";

import { HttpPostClientSpy } from "@/data/test/mock.http-client";
import { mockAuthentication } from "@/domain/test/mock-authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();

  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoveAuthentication", () => {
  it("should call HttpPostClient with correct Url", async () => {
    const url = faker.internet.url();

    const { httpPostClientSpy, sut } = makeSut(url);

    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toEqual(url);
  });

  it("should call HttpPostClient with correct body", async () => {
    const { httpPostClientSpy, sut } = makeSut();

    const authenticationParams = mockAuthentication();

    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});
