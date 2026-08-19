import { connection } from '#/database/index.js';
const UserModel = connection.sequelize.define(
  'User',
  {
    id: {
      type: connection.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'user_id',
    },
    name: {
      type: connection.DataTypes.STRING(50),
      allowNull: false,
      field: 'user_name',
    },
    email: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      field: 'user_name',
    },
    role: {
      type: connection.DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    },
  },
  {
    timestamps: true,
  },
);

export default UserModel;
