module.exports = app => {
  const { STRING, DataTypes, INTEGER } = app.Sequelize;
  const MicroTask = app.model.define(
    'microtask',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      taskid: INTEGER,
      dsc: STRING(100),
      complete: INTEGER,
      remark: STRING(1000),
      priority: INTEGER,
      create_at: DataTypes.DATE,
      update_at: DataTypes.DATE,
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  MicroTask.associate = function() {
    app.model.Microtask.belongsTo(app.model.Task, {
      targetKey: 'id',
      foreignKey: 'taskid',
    });
  };

  return MicroTask;
};
