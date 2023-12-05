import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async getAllTeams(req: Request, res: Response) {
    const { data, status } = await this.teamService.getAllTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
