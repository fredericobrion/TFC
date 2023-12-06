import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

// router.get(
//   '',
//   (req: Request, res: Response) => matchController.getMatchesByProgress(req, res),
// );
router.get('/', (req: Request, res: Response) => {
  const { inProgress } = req.query;

  if (inProgress === undefined) {
    matchController.getAllMatches(req, res);
  } else {
    matchController.getMatchesByProgress(req, res);
  }
});

export default router;
