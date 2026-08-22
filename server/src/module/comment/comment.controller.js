import structure from '#/common/structure/_index.js';
import service from './comment.service.js';
import { Router } from 'express';
const router = Router();

router.post('/', async (req, res) => {
  const serviceFeedback = await service.createCommentService(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.post('/find-or-create', async (req, res) => {
  const serviceFeedback = await service.findOrCreateCommentService(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.patch('/:commentId', async (req, res) => {
  const serviceFeedback = await service.updateContentById(req.params.commentId, req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.get('/search', async (req, res) => {
  const serviceFeedback = await service.searchCommentsService(req.query);
  return structure.sendSuccess(res, serviceFeedback);
});

router.get('/newest/:postId', async (req, res) => {
  const serviceFeedback = await service.getNewestCommentsByPostId(req.params.postId);
  return structure.sendSuccess(res, serviceFeedback);
});
router.get('/details/:id', async (req, res) => {
  const serviceFeedback = await service.getCommentDetailsById(req.params.id);
  return structure.sendSuccess(res, serviceFeedback);
});

// router.delete('/:postId', async (req, res) => {
//   const serviceFeedback = await service.deletePostService(req.params.postId, req.body);
//   return structure.sendSuccess(res, serviceFeedback);
// });

// router.get('/details', async (req, res) => {
//   const serviceFeedback = await service.retrievePostDetails();
//   return structure.sendSuccess(res, serviceFeedback);
// });

// router.get('/comment-count', async (req, res) => {
//   const serviceFeedback = await service.retrievePostDetailsWithCommentCount(req.body);
//   return structure.sendSuccess(res, serviceFeedback);
// });

export default router;
