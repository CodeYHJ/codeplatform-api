

export interface ChartController {
  getTaskNumToday: () => Promise<void>;
  getTaskNumInWeek: () => Promise<void>;
  getTaskNumInMonth: () => Promise<void>;
}
