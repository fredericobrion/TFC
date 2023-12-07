import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Leaderboard from '../classes/Leaderboard';

export default class LeaderBoardService {
  private leaderboard: Leaderboard = new Leaderboard();

  async getLeaderBoard(home: boolean): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboard.getLeaderboard(home);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
