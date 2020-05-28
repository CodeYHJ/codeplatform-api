import { Service } from 'egg';
import { dbError } from '../lib/index';
import { E400 } from '../lib/index';

/**
 * User Service
 */
export default class UserService extends Service {
  /**
   *
   * @param {string} name - name
   * @param {string} password - password
   */
  public async login(name, password) {
    const {
      ctx: {
        model: { User, Auth },
      },
    } = this;
    const dbResultByName = await User.findOne({
      raw: true,
      attributes: [ 'name', 'password', 'id', 'salt', 'create_at', 'avatar_url' ],
      where: { name },
    })
      .then(res => {
        if (res === null) return res;
        return res;
      })
      .catch(err => {
        throw dbError.from(err);
      });
    if (dbResultByName) {
      const { salt: dbSalt, password: dbPassword } = dbResultByName;
      const computerPassword = await this.ctx.helper.encryptionBySalt(
        password,
        dbSalt,
      );
      if (dbPassword === computerPassword) {
        const yuqueDB = await Auth.findOne({
          raw: true,
          attributes: [ 'oauthid' ],
          where: { userid: dbResultByName.id },
        });
        dbResultByName.yuqueid = yuqueDB ? yuqueDB.oauthid : null;
        return this.ctx.helper.extendByFilter(dbResultByName, [
          'salt',
          'password',
        ]);
      }
      throw new E400('账户或密码错误');
    }
    throw new E400('账户或密码错误');
  }

  /**
   *
   * @param {string} name - name
   * @param {string} password - password
   *
   */
  public async registered(name, password) {
    const { password: pd, salt } = await this.ctx.helper.encryption(password);
    const defaultModel = {
      name: '',
      avatar_url: 'https://github.com/CodeYHJ/markDownPhoto/blob/master/admin/userlogo.png?raw=true',
      phone: '',
      password: '',
      salt: '',
    };
    const setModel = {
      ...defaultModel,
      name,
      password: pd,
      salt,
    };
    const [ dbResult, isCreate ] = await this.ctx.model.User.findOrCreate({
      where: { name },
      defaults: setModel,
    })
      .spread((task, created) => {
        return [ task ? task.get({ plain: true }) : null, created ];
      })
      .catch(err => {
        throw dbError.from(err);
      });
    if (isCreate) {
      return this.ctx.helper.extendByFilter(dbResult, [ 'password', 'salt' ]);
    }
    throw new E400('用户已存在');
  }

  /**
   *
   * @param {string} name  - name
   */
  public async findName(name) {
    const { ctx } = this;
    const dbResult = await ctx.model.User.findOne({
      raw: true,
      attributes: {
        exclude: [ 'password', 'id', 'salt', 'create_at', 'update_at' ],
      },
      where: { name },
    }).catch(err => {
      throw dbError.from(err);
    });
    if (dbResult) return false;
    return true;
  }

  /**
   *
   * @param {object} data - 个人信息
   */
  public async upDateAccount(data) {
    const { ctx } = this;
    const queryData = Object.create(data);
    delete queryData.id;
    if (queryData.password) {
      const { password: pd, salt } = await this.ctx.helper.encryption(
        queryData.password,
      );
      queryData.password = pd;
      queryData.salt = salt;
    }
    const dbResult = await ctx.model.User.update(queryData, {
      where: { id: data.userid },
    }).catch(err => {
      throw dbError.from(err);
    });

    if (dbResult && dbResult[0] === 1) {
      return true;
    }
    return false;
  }
  /**
   *
   * @param {number} id - 用户id
   */
  public async getUserInfo(id) {
    const { ctx } = this;
    const info = await ctx.model.User.findOne({
      raw: true,
      attributes: [ 'name', 'avatar_url' ],
      where: { id },
    }).catch(err => {
      throw dbError.from(err);
    });
    return info;
  }
}
