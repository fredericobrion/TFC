import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';

const extractToken = (bearerToken: string): string => bearerToken.split(' ')[1];

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.header('Authorization');

  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = extractToken(bearerToken);

  try {
    const decoded = JWT.verify(token);

    res.locals.role = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
