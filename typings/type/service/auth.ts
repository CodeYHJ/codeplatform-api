import { PromiseCb } from '..';

enum AuthTypeEnum {
  yuque = 1,
}
interface GetAllTokenResponse {
  name: string;
  id: number;
  credential: string;
  oauthType: AuthTypeEnum;
}
interface SetTokenRequest {
  id?: number;
  usreid: number;
  name: string;
  token: string;
  oauthType: AuthTypeEnum;
}

interface SetTokenResponse {
  name: string;
  id: number;
  credential: string;
}

export abstract class AuthService {
  public abstract getAllToken: PromiseCb<number, GetAllTokenResponse[]>;
  public abstract setToken: PromiseCb<SetTokenRequest, SetTokenResponse>;
  public abstract updateToken: PromiseCb<SetTokenRequest, boolean>;
  public abstract deleteToken: PromiseCb<number, boolean>;
}
