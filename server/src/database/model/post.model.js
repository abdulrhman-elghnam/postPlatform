import { connection } from '#/database/index.js';
const PostModel = connection.sequelize.define(
  'Post',
  {
    id: {
      type: connection.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'PostOd',
    },
    title: {
      type: connection.DataTypes.STRING(255),
      allowNull: false,
      field: 'PostTitle',
    },
    content: {
      type: connection.DataTypes.STRING(5000),
      allowNull: false,
      field: 'PostContent',
    },
  },
  {
    paranoid: true,
    timestamps: true,
  },
);

export default PostModel;
