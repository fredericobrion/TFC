import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) {}

  async getLeaderboardHome(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getLeaderBoardByHomeAndAway(true);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getLeaderboardAway(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getLeaderBoardByHomeAndAway(false);

    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getFullLeaderboard(_req: Request, res: Response) {
    const { data, status } = await this.leaderboardService.getFullLeaderboard();

    return res.status(mapStatusHTTP(status)).json(data);
  }
}
