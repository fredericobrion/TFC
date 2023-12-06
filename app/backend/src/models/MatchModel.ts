import MatchModelSequelize from '../database/models/MatchModelSequelize';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import IMatchWithTeams from '../Interfaces/matches/IMatchWithTeams';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

export default class MatchModel implements IMatchModel {
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
}
