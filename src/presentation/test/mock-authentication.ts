import { AccountModel } from "@/domain/models/account";
import { mockAccountModel } from "@/domain/test/mock-authentication";
import {
  Authentication,
  AuthenticationParams,
} from "@/domain/usecases/authentication";

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel();
  params: AuthenticationParams;

  auth(authParams: AuthenticationParams): Promise<AccountModel> {
    this.params = authParams;
    return Promise.resolve(this.account);
  }
}
