export interface UserController {
  Login: Promise<void>;
  loginOut: Promise<void>;
  registered: Promise<void>;
  findname: Promise<void>;
  updateAccount: Promise<void>;
  getUserInfo: Promise<void>;
}
