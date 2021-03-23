import axios from "axios";
import faker from "faker";

import { mockAxios } from "@/infra/test/mock-axios";
import { httpPostParams } from "@/data/test";

import AxiosHttpClient from "./axios-http-client";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return { sut, mockedAxios };
};

describe("AxiosHttpClient", () => {
  it("should call axios with correct values", async () => {
    const { sut, mockedAxios } = makeSut();

    const postParams = httpPostParams();

    await sut.post(postParams);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      postParams.url,
      postParams.body
    );
  });

  it("should call axios with correct response object", () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = sut.post(httpPostParams());

    expect(httpResponse).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
