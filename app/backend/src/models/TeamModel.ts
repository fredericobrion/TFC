import { ITeam } from '../Interfaces/teams/ITeam';
import TeamModelSequelize from '../database/models/TeamModelSequelize';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = TeamModelSequelize;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { teamName }: ITeam = dbData;
    return { id, teamName };
  }
}
