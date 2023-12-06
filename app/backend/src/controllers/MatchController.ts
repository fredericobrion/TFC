import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

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
}
