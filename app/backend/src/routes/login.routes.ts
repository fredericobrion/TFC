import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import validateToken from '../middlewares/ValidateToken';

const loginController = new LoginController();

const router = Router();

router.post('/', (req: Request, res: Response) =>
  loginController.login(req, res));

router.get('/role', validateToken, (req: Request, res: Response) =>
  loginController.getRole(req, res));

export default router;
