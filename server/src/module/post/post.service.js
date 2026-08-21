import { model } from '#/database/_index.js';
import createError from 'http-errors';

async function createPostService(data) {
    const isFound = await model.UserModel.findByPk(data.UserId)
    if(!isFound) throw createError(404,"user not found")
    const post = await model.PostModel.create(data, {
        include: model.UserModel
    })
    return { statusCode: 201, message: 'created', data: post };
}
async function deletePostService() {

}
async function retrievePostDetails() { }
async function retrievePostDetailsWithCommentCount() { }



export default {
    createPostService,
    deletePostService,
    retrievePostDetails,
    retrievePostDetailsWithCommentCount,
};
