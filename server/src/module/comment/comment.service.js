import { model } from '#/database/_index.js';
import { Op } from 'sequelize';
import createError from 'http-errors';

async function createCommentService(data) {
  const isFound = await model.PostModel.findByPk(data.PostId);
  if (!isFound) throw createError(404, 'post not found');
  const comment = await model.CommentModel.create(data, {
    include: {
      model: model.UserModel,
    },
  });
  return { statusCode: 201, message: 'created', data: comment };
}

async function updateContentById(commentId, data) {
  const comment = await model.CommentModel.findByPk(commentId);

  if (!comment) {
    throw createError(404, 'comment not found');
  }

  if (comment.UserId !== data.userId) {
    throw createError(403, 'you are not the owner of this comment');
  }

  comment.content = data.content;

  await comment.save();

  return {
    statusCode: 200,
    message: 'comment updated successfully',
    data: comment,
  };
}

async function findOrCreateCommentService(data) {
  const [comment, created] = await model.CommentModel.findOrCreate({
    where: {
      PostId: data.PostId,
      UserId: data.UserId,
      content: data.content,
    },
    defaults: {
      PostId: data.PostId,
      UserId: data.UserId,
      content: data.content,
    },
  });

  return {
    statusCode: created ? 201 : 200,
    message: created ? 'comment created' : 'comment already exists',
    data: comment,
  };
}

async function searchCommentsService(word) {
  const comments = await model.CommentModel.findAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });

  const count = await model.CommentModel.count({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });

  return {
    statusCode: 200,
    message: 'comments retrieved successfully',
    count,
    data: comments,
  };
}

async function getNewestCommentsByPostId(postId) {
  const comments = await model.CommentModel.findAll({
    where: {
      PostId: postId,
    },
    order: [['createdAt', 'DESC']],
    limit: 3,
  });

  return {
    statusCode: 200,
    message: 'newest comments retrieved successfully',
    data: comments,
  };
}

async function getCommentDetailsById(id) {
  const comment = await model.CommentModel.findByPk(id, {
    include: [
      {
        model: model.UserModel,
      },
      {
        model: model.PostModel,
      },
    ],
  });

  if (!comment) {
    throw createError(404, 'comment not found');
  }

  return {
    statusCode: 200,
    message: 'comment details retrieved successfully',
    data: comment,
  };
}
export default {
  createCommentService,
  updateContentById,
  findOrCreateCommentService,
  searchCommentsService,getNewestCommentsByPostId,
  getCommentDetailsById

};
