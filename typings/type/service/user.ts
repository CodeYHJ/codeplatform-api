import { PromiseCb } from '..';

interface Login{
  userid: number;
  name?: string;
  avatar_url?: string;
  password?: string;
}

export abstract class TaskService {
  public abstract login: PromiseCb<Login, Login>
  public abstract registered: PromiseCb<Login, Login>
  public abstract findName: PromiseCb<string, boolean>
  public abstract upDateAccount: PromiseCb<Login, boolean>
  public abstract getUserInfo: PromiseCb<number, Login>

}
