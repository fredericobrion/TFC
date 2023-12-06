import { Router } from 'express';
import teamsRouter from './teams.routes';
import loginRouter from './login.routes';
import matchesRouter from './match.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchesRouter);

export default router;
