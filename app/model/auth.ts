module.exports = app => {
  const { STRING, DataTypes, INTEGER } = app.Sequelize;
  const Auth = app.model.define(
    'auth',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: INTEGER,
      avatar_url: STRING(100),
      name: STRING(45),
      oauthtype: INTEGER,
      oauthid: STRING(45),
      union: STRING(45),
      credential: STRING(45),
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  Auth.associate = function() {
    app.model.Auth.belongsTo(app.model.User, {
      foreignKey: 'userid',
    });
  };

  return Auth;
};
