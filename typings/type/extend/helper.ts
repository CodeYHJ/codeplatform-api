import { ExtendIHelperType } from '../../app/extend/helper';
import { TaskNumInMounth, TaskNumTodayResponse } from '../service/chart';

interface Encryption{
  salt: string;
  password: string;
}
export interface Helper extends ExtendIHelperType {
  extend: (form: Record<string, any>) => Record<string, any>;
  extendByFilter: (from: Record<string, any>, filter: Array<string>) => Record<string, any>;
  encryption: (str: string) => Encryption;
  encryptionBySalt: (str: string, salt: string) => string;
  leftTimeStartInWeek: (difday: number) => number;
  rightTimeEndInWeek: (difday: number) => number;
  timeStartInMonth: () => Date;
  timeEndInMonth: () => Date;
  getDaysOfMonth: () => number;
  handleMonthData: (list: any[], days: number) => TaskNumInMounth[];
  filterTask: (list: any[]) => TaskNumTodayResponse;
}
