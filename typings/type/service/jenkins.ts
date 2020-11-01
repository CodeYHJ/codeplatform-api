import { PromiseCbNoPara, PromiseCb } from '..';

interface GetAllTestResponse {
  name: string;
  url: string;
  working: boolean;
}

interface GetTestDscResponse {
  building: boolean;
  fullDisplayName: string;
  id: number;
  queueId: number;
  result: string;
}

export abstract class JenkinsService {
  public abstract getAllTest: PromiseCbNoPara<GetAllTestResponse[]>;
  public abstract getTestDsc: PromiseCb<string, GetTestDscResponse[]>;
}
