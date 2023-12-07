import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import Leaderboard from '../classes/Leaderboard';

export default class LeaderBoardService {
  private leaderboard: Leaderboard = new Leaderboard();

  async getLeaderBoardByHomeAndAway(home: boolean): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboard.getLeaderBoardByHomeAndAway(home);
    return { status: 'SUCCESSFUL', data: leaderboard };
  }

  async getFullLeaderboard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboard.getLeaderBoard();
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
