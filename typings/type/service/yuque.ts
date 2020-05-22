import { PromiseCb } from '..';
export interface UpdateAccountProps {
  userid: number;
  credential: string;
  avatar_url: string;
  name: string;
  oauthid: number;
}
export abstract class YuQueService {
  public yuqueRequest: PromiseCb<string, any>;
  public updateAccount: PromiseCb<UpdateAccountProps, boolean>;
}
