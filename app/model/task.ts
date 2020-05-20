module.exports = app => {
  const { STRING, DataTypes, INTEGER } = app.Sequelize;
  const Task = app.model.define(
    'task',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      userid: INTEGER,
      name: STRING(100),
      frequency: INTEGER,
      complete: INTEGER,
      type: INTEGER,
      starttime: DataTypes.DATE,
      endtime: DataTypes.DATE,
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  Task.associate = function() {
    app.model.Task.hasMany(app.model.Microtask, {
      foreignKey: 'taskid',
      targetKey: 'id',
    });
  };

  return Task;
};
