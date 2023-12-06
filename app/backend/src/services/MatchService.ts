import MatchModel from '../models/MatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';

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
}
