import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

export default class MatchService {
  constructor(private matchModel: MatchModel = new MatchModel()) {}

  async getAllMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async getMatchesByProgress(inProgress: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    const filteredMatches = matches.filter((match) => match.inProgress === inProgress);
    return { status: 'SUCCESSFUL', data: filteredMatches };
  }

  async finishMatch(id: number): Promise<ServiceResponse<IMatch | { message: string }>> {
    const matchToUpdate = await this.matchModel.finish(id);

    if (matchToUpdate === 'not found') {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    if (matchToUpdate === 'finished') {
      return { status: 'INVALID_DATA', data: { message: 'Match already finished' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateInProgressScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch | { message: string }>> {
    const matchToUpdate = await this.matchModel.updateInProgressScore(
      id,
      homeTeamGoals,
      awayTeamGoals,
    );

    if (matchToUpdate === 'not found') {
      return { status: 'NOT_FOUND', data: { message: 'Match not found' } };
    }
    if (matchToUpdate === 'finished') {
      return { status: 'INVALID_DATA', data: { message: 'Match is already finished' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<IMatch>> {
    const teams = await TeamModelSequelize.findAll();

    const homeTeam = teams.find((team) => team.id === homeTeamId);
    const awayTeam = teams.find((team) => team.id === awayTeamId);

    if (!homeTeam || !awayTeam) {
      return { status: 'NOT_FOUND', data: { message: 'awayTeamId must be a valid team' } };
    }

    const match = await this.matchModel.create(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );

    return { status: 'SUCCESSFUL', data: match };
  }
}
