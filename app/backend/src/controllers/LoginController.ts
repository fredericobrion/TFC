import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import generateErrorMessage from '../services/validatios/loginSchema';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const error = generateErrorMessage({ email, password });

    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    const { data, status } = await this.loginService.login(email, password);

    console.log(status);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  getRole = (_req: Request, res: Response) => {
    const { role } = res.locals.role;

    if (!role) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    return res.status(200).json({ role });
  };
}
