import UserModel from './../user.model.js';
import PostModel from './../post.model.js';
import CommentModel from './../comment.model.js';

UserModel.hasMany(PostModel);

PostModel.belongsTo(UserModel);

PostModel.hasMany(CommentModel);

CommentModel.belongsTo(PostModel);

UserModel.hasMany(CommentModel);

CommentModel.belongsTo(UserModel);
