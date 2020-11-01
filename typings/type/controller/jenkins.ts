export interface JenkinsController {
  getAll: Promise<void>;
  getTestDsc: Promise<void>;
}
