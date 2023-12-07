import TeamModelSequelize from '../database/models/TeamModelSequelize';
import MatchModelSequelize from '../database/models/MatchModelSequelize';
import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import MatchPerformances from './MatchPerformances';

export default class Leaderboard {
  private teams: ITeam[] = [];
  private matches: IMatch[] = [];

  constructor() {
    this.getTeams();
    this.getMatches();
  }

  async getTeams(): Promise<ITeam[]> {
    this.teams = await TeamModelSequelize.findAll();
    return this.teams;
  }

  async getMatches(): Promise<IMatch[]> {
    this.matches = await MatchModelSequelize.findAll();
    return this.matches;
  }

  async getLeaderboard(home: boolean): Promise<ILeaderboard[]> {
    const leaderboard = this.teams.map((team) => {
      const filteredMatches = this.matches.filter((match) => (home
        ? match.homeTeamId === team.id : match.awayTeamId === team.id) && !match.inProgress);
      const matchPerformances = new MatchPerformances(filteredMatches);
      return {
        name: team.teamName,
        totalPoints: matchPerformances.calculatePoints(home),
        totalGames: filteredMatches.length,
        totalVictories: matchPerformances.calculateVictories(home),
        totalDraws: matchPerformances.calculateDraws(),
        totalLosses: matchPerformances.calculateLosses(home),
        goalsFavor: matchPerformances.calculateGoalsFavor(home),
        goalsOwn: matchPerformances.calculateGoalsOwn(home),
      };
    });
    return leaderboard;
  }
}
