import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import validateToken from '../middlewares/ValidateToken';
import validateNewMatchBody from '../middlewares/validateNewMatchBody';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === undefined) {
    matchController.getAllMatches(req, res);
  } else {
    matchController.getMatchesByProgress(req, res);
  }
});

router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

router.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matchController.updateInProgressScore(req, res),
);

router.post(
  '/',
  validateToken,
  validateNewMatchBody,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
