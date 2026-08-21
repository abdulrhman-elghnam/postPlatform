import { connection } from '#/database/_index.js';
const CommentModel = connection.sequelize.define(
  'Comment',
  {
    id: {
      type: connection.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'CommentId',
    },
    content: {
      type: connection.DataTypes.STRING(5000),
      allowNull: false,
      field: 'CommentContent',
    },
  },
  {
    timestamps: true,
  },
);

export default CommentModel;
