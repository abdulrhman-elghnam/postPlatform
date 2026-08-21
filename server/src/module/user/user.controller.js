import structure from '#/common/structure/_index.js';
import service from './user.service.js';
import express from 'express';
const router = express();

router.post('/signup', async (req, res) => {
  const serviceFeedback = await service.createUserService(req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.put('/:id', async (req, res) => {
  const serviceFeedback = await service.updateUserService(req.params.id, req.body);
  return structure.sendSuccess(res, serviceFeedback);
});

router.get('/by-email', async (req, res) => {
  const serviceFeedback = await service.findUserByEmailServices(req.query.email);
  return structure.sendSuccess(res, serviceFeedback);
});

router.get('/:id', async (req, res) => {
  const serviceFeedback = await service.getUserByIdServices(req.params.id);
  return structure.sendSuccess(res, serviceFeedback);
});

export default router;
