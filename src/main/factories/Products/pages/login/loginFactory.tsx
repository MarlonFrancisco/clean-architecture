import { Login } from "@/presentation/pages";

import {
  ValidationComposite,
  ValidationBuilder,
} from "@/validation/validators";

import RemoteAuthentication from "@/data/usercases/authentication/RemoteAuthentication";
import AxiosHttpClient from "@/infra/axios-http-client/axios-http-client";

const MakeLogin = () => {
  const validation = new ValidationComposite([
    ...ValidationBuilder.field("email").required().email().build(),
    ...ValidationBuilder.field("password").required().min(5).build(),
  ]);

  const httpAxiosClient = new AxiosHttpClient();

  const authentication = new RemoteAuthentication(
    "http://fordevs.herokuapp.com/api/login",
    httpAxiosClient
  );

  return <Login validation={validation} authentication={authentication} />;
};

export { MakeLogin };
