import { connection } from '#/database/_index.js';
import createError from 'http-errors';
const UserModel = connection.sequelize.define(
  'User',
  {
    id: {
      type: connection.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'UserId',
    },
    name: {
      type: connection.DataTypes.STRING(50),
      allowNull: false,
      field: 'UserName',
    },
    email: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      field: 'UserEmail',
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: connection.DataTypes.STRING,
      allowNull: false,
      field: 'UserPassword',
      validate: {
        min: 7,
      },
    },
    role: {
      type: connection.DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      field: 'UserRole',
    },
  },
  {
    hooks: {
      beforeCreate: (user) => {
        function checkNameLength() {
          if (user.name.length <= 2) {
            throw createError(409, 'User name must be greater than 2 characters');
          }
        }
        checkNameLength();
      },
    },
    // paranoid: true,
    timestamps: true,
  },
);

export default UserModel;
