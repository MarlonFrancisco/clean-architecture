import { AuthenticationParams } from "../../../domain/usecases/authentication";
import { HttpPostClient } from "../../protocols/http/http-post-client";

class RemoteAuthentication {
  constructor(private url: string, private httpPostclient: HttpPostClient) {}

  auth(params: AuthenticationParams): Promise<void> {
    return this.httpPostclient.post({ url: this.url, body: params });
  }
}

export default RemoteAuthentication;
