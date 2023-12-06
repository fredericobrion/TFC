import MatchModelSequelize from '../database/models/MatchModelSequelize';
import IMatchWithTeams from '../Interfaces/matches/IMatchWithTeams';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

export default class MatchModel {
  private model = MatchModelSequelize;

  async findAll(): Promise<IMatchWithTeams[]> {
    const teams = await TeamModelSequelize.findAll();
    const dbData = await this.model.findAll();

    const matches = dbData.map((match) => ({
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: {
        teamName: teams.find((team) => team.id === match.homeTeamId)?.teamName,
      },
      awayTeam: {
        teamName: teams.find((team) => team.id === match.awayTeamId)?.teamName,
      },
    }));

    return matches;
  }

  async finish(id: number): Promise<void | string> {
    const matchToUpdate = await this.model.findByPk(id);

    if (!matchToUpdate) {
      return 'not found';
    }
    if (!matchToUpdate.inProgress) {
      return 'finished';
    }

    matchToUpdate.inProgress = false;
    await matchToUpdate.save();
  }

  async updateInProgressScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<void | string> {
    const matchToUpdate = await this.model.findByPk(id);

    if (!matchToUpdate) {
      return 'not found';
    }
    if (!matchToUpdate.inProgress) {
      return 'finished';
    }

    matchToUpdate.homeTeamGoals = homeTeamGoals;
    matchToUpdate.awayTeamGoals = awayTeamGoals;
    await matchToUpdate.save();
  }
}
