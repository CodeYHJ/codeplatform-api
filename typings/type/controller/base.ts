import { PromiseCbNoPara } from '..';


export interface BaseController {
  check: PromiseCbNoPara<void>;
  yuqueRequest: PromiseCbNoPara<void>;
  getRequest: PromiseCbNoPara<void>;
  postRequest: PromiseCbNoPara<void>;
}
