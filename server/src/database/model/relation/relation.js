import UserModel from './../user.model.js';
import PostModel from './../post.model.js';
import CommentModel from './../comment.model.js';

UserModel.hasMany(PostModel,{onUpdate:"CASCADE",onDelete:"CASCADE"});
PostModel.belongsTo(UserModel,{onUpdate:"CASCADE",onDelete:"CASCADE"});

PostModel.hasMany(CommentModel,{onUpdate:"CASCADE",onDelete:"CASCADE"});
CommentModel.belongsTo(PostModel,{onUpdate:"CASCADE",onDelete:"CASCADE"});

UserModel.hasMany(CommentModel,{onUpdate:"CASCADE",onDelete:"CASCADE"});
CommentModel.belongsTo(UserModel,{onUpdate:"CASCADE",onDelete:"CASCADE"});
