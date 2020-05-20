import { v1 as uuidv1 } from 'uuid';
import * as crypto from 'crypto';

module.exports = {
  extend(from) {
    const to = Object.create(null);
    Object.keys(to).forEach(item => {
      to[item] = from[item];
    });
    return to;
  },
  extendByFilter(from, filter) {
    const to = Object.create(null);
    Object.keys(from).forEach(item => {
      if (!filter.includes(item)) {
        to[item] = from[item];
      }
    });
    return to;
  },
  encryption(str) {
    const salt = uuidv1();
    const password = crypto
      .createHmac('sha256', salt)
      .update(str)
      .digest('base64');
    return {
      salt,
      password,
    };
  },
  encryptionBySalt(str, salt) {
    const password = crypto
      .createHmac('sha256', salt)
      .update(str)
      .digest('base64');
    return password;
  },
  leftTimeStartInWeek(difday) {
    const difTime = difday * 24 * 60 * 60 * 1000;
    const targetTime =
      new Date(new Date().setHours(0, 0, 0, 0)).getTime() - difTime;
    const dayTime = new Date(
      new Date(targetTime).setHours(0, 0, 0, 0)
    ).getTime();
    return dayTime;
  },
  rightTimeEndInWeek(difday: number) {
    const difTime = difday * 24 * 60 * 60 * 1000;
    const targetTime = new Date().getTime() + difTime;
    const dayTime = new Date(
      new Date(targetTime).setHours(23, 59, 59, 999)
    ).getTime();

    return dayTime;
  },
  timeStartInMonth() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    return new Date(new Date(y, m, 1).setHours(0, 0, 0, 0));
  },
  timeEndInMonth() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    return new Date(new Date(y, m + 1, 1).setHours(23, 59, 59, 999));
  },
  getDaysOfMonth() {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date(year, month, 0);
    const days = date.getDate();
    return days;
  },
  handleMonthData: (list, days) => {
    const totalMap = new Map<number, any>();
    const completeMap = new Map<number, any>();
    for (let i = 0; i <= days; i++) {
      completeMap.set(i, {
        name: 'Complete',
        day: `${i}`,
        num: 0,
      });
      totalMap.set(i, {
        name: 'Total',
        day: `${i}`,
        num: 0,
      });
    }
    // 存在的任务整理
    list.forEach(el => {
      const createTime = el.create_at;
      const transFormDay = new Date(createTime).getDate();
      if (el.complete === 1) {
        const targetComplete = completeMap.get(transFormDay);
        targetComplete.num = targetComplete.num += 1;
        completeMap.set(transFormDay, targetComplete);
      }
      const targetTotal = totalMap.get(transFormDay);
      targetTotal.num = targetTotal.num += 1;
      totalMap.set(transFormDay, targetTotal);
    });
    const resultList: any[] = [];
    // 整理数据结构
    for (const value of completeMap.values()) {
      resultList.push(value);
    }
    for (const value of totalMap.values()) {
      resultList.push(value);
    }
    return resultList;
  },
  filterTask: list => {
    const completedNum = list.filter(el => el.complete === 1).length;
    const totalNum = list.length;
    const failNum = list.filter(el => el.complete === 3).length;
    return { totalNum, completedNum, failNum };
  },
};
