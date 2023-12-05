import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async getAllTeams(_req: Request, res: Response) {
    const { data, status } = await this.teamService.getAllTeams();
    res.status(mapStatusHTTP(status)).json(data);
  }

  async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { data, status } = await this.teamService.getTeamById(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }
}
