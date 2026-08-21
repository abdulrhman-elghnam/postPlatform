import { model } from '#/database/_index.js';
import createError from 'http-errors';

async function createCommentService(data) {
  const isFound = await model.PostModel.findByPk(data.PostId);
  if (!isFound) throw createError(404, 'user not found');
  const comment = await model.CommentModel.create(data, {
    include: {
      model: model.UserModel,
    },
  });
  return { statusCode: 201, message: 'created', data: comment };
}

export default {
  createCommentService,
};
