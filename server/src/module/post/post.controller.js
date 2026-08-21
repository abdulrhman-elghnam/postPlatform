import structure from '#/common/structure/_index.js';
import service from './post.service.js';
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
  const serviceFeedback = await service.createPostService(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.delete('/:postId', async (req, res) => {
  const serviceFeedback = await service.deletePostService(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.get('/details', async (req, res) => {
  const serviceFeedback = await service.retrievePostDetails(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.get('/comment-count', async (req, res) => {
  const serviceFeedback = await service.retrievePostDetailsWithCommentCount(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

export default router;
