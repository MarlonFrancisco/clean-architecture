export enum HttpStatusReponse {
  unauthorized = 401,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  ok = 200,
}

export interface HttpResponse<R> {
  statusCode: HttpStatusReponse;
  body?: R;
}
