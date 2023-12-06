import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import updateMatchSchema from '../services/validatios/updateMatchSchema';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async getAllMatches(_req: Request, res: Response) {
    const { data, status } = await this.matchService.getAllMatches();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async getMatchesByProgress(req: Request, res: Response) {
    const { inProgress } = req.query;

    const { data, status } = await this.matchService.getMatchesByProgress(inProgress === 'true');
    res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const { data, status } = await this.matchService.finishMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  async updateInProgressScore(req: Request, res: Response) {
    const { id } = req.params;

    const { error } = updateMatchSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    const { homeTeamGoals, awayTeamGoals } = req.body;

    const { data, status } = await this.matchService.updateInProgressScore(
      Number(id),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    res.status(mapStatusHTTP(status)).json(data);
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

    const { data, status } = await this.matchService.createMatch(
      Number(homeTeamId),
      Number(awayTeamId),
      Number(homeTeamGoals),
      Number(awayTeamGoals),
    );
    res.status(mapStatusHTTP(status)).json(data);
  }
}
