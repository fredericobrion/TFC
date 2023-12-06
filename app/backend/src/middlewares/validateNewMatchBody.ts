import { NextFunction, Request, Response } from 'express';
import createMatchSchema from '../services/validatios/createMatchSchema';

const validateNewMatchBody = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const { error } = createMatchSchema.validate({
    homeTeamId: Number(homeTeamId),
    awayTeamId: Number(awayTeamId),
    homeTeamGoals: Number(homeTeamGoals),
    awayTeamGoals: Number(awayTeamGoals),
  });

  if (error) return res.status(400).json({ message: error.message });

  if (req.body.homeTeamId === req.body.awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  next();
};

export default validateNewMatchBody;
