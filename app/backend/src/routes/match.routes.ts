import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';
import validateToken from '../middlewares/ValidateToken';

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

export default router;
