import { model } from '#/database/_index.js';
import createError from 'http-errors';
async function createUserService(data) {
  const user = await model.UserModel.findOne({
    where: {
      email: data.email,
    },
  });
  if (user) throw createError(404, 'user created before ');

  const queryResult = await model.UserModel.create(data);
  return { statusCode: 201, message: 'created', data: queryResult };
}

async function updateUserService(id, data) {
  const user = await model.UserModel.findByPk(id);
  if (!user) throw createError(404, 'user not found');
  const queryResult = await model.UserModel.update(data, {
    where: {
      id: id,
    },
    validate: false,
  });
  return { statusCode: 200, message: 'updated', data: queryResult };
}

async function findUserByEmailServices(email) {
  const user = await model.UserModel.findOne({
    where: {
      email: email,
    },
  });
  if (!user) throw createError(404, 'user not found');
  return { statusCode: 201, message: 'ok', data: user };
}

async function getUserByIdServices(id) {
  const user = await model.UserModel.findByPk(id, {
    attributes: {
      exclude: ['role'],
    },
  });
  if (!user) throw createError(404, 'user not found');
  return { statusCode: 201, message: 'ok', data: user };
}

export default {
  createUserService,
  updateUserService,
  findUserByEmailServices,
  getUserByIdServices,
};
