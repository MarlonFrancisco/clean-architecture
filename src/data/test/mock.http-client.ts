import {
  HttpPostParams,
  HttpPostClient,
} from "../protocols/http/http-post-client";

class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: object;

  post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve();
  }
}

export { HttpPostClientSpy };