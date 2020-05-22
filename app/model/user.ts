module.exports = app => {
  const { STRING, CHAR, DataTypes, INTEGER } = app.Sequelize;
  const User = app.model.define(
    'user',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      avatar_url: STRING(2083),
      phone: STRING(20),
      password: CHAR(20),
      salt: CHAR(30),
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  User.associate = function() {
    app.model.User.hasMany(app.model.Auth, {
      foreignKey: 'userid',
      targetKey: 'id',
    });
  };

  return User;
};
