import {
  HttpPostParams,
  HttpPostClient,
} from "../protocols/http/http-post-client";
import {
  HttpResponse,
  HttpStatusReponse,
} from "../protocols/http/http-response";

class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string;
  body?: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusReponse.noContent,
  };

  post(params: HttpPostParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export { HttpPostClientSpy };
