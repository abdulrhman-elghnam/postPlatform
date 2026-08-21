import { model } from '#/database/_index.js';
import { Op } from 'sequelize';
import createError from 'http-errors';

async function createPostService(data) {
  const isFound = await model.UserModel.findByPk(data.UserId);
  if (!isFound) throw createError(404, 'user not found');
  const post = await model.PostModel.create(data, {
    include: {
      model: model.UserModel,
    },
  });
  return { statusCode: 201, message: 'created', data: post };
}
async function deletePostService(postId, data) {
  const post = await model.PostModel.findByPk(postId);
  if (!post) throw createError(404, 'post not found');

  const isFound = await model.UserModel.findByPk(data.UserId);
  if (!isFound) throw createError(404, 'user not found');
  const queryResult = await model.PostModel.destroy({
    where: {
      [Op.and]: [{ PostId: postId }, { UserId: data.UserId }],
    },
  });
  if (queryResult) throw createError(401, 'not authorized to do that action');
  return { statusCode: 200, message: 'deleted', data: queryResult };
}
async function retrievePostDetails() {
  const post = await model.PostModel.findAll({
    include: [{ model: model.UserModel }, { model: model.CommentModel }],
  });
  return { statusCode: 200, message: 'deleted', data: post };
}
async function retrievePostDetailsWithCommentCount() {
  const posts = await model.PostModel.findAll({
    attributes: ['PostId', 'PostTitle'],
    include: [
      {
        model: model.CommentModel,
        attributes: ['CommentId', 'CommentContent'],
      },
    ],
  });

  return {
    statusCode: 200,
    message: 'success',
    data: posts,
  };
}

export default {
  createPostService,
  deletePostService,
  retrievePostDetails,
  retrievePostDetailsWithCommentCount,
};
