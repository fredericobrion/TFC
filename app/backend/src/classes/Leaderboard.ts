import TeamModelSequelize from '../database/models/TeamModelSequelize';
import MatchModelSequelize from '../database/models/MatchModelSequelize';
import { ITeam } from '../Interfaces/teams/ITeam';
import { IMatch } from '../Interfaces/matches/IMatch';
import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';
import MatchPerformancesByHomeAndAway from './MatchPerformancesByHomeAndAway';
import orderLeaderboard from '../utils/orderLeaderBoard';
import FullMatchPerformances from './FullMatchPerformances';

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

  async getLeaderBoardByHomeAndAway(home: boolean): Promise<ILeaderboard[]> {
    const leaderboard = this.teams.map((team) => {
      const filteredMatches = this.matches.filter((match) => (home
        ? match.homeTeamId === team.id : match.awayTeamId === team.id) && !match.inProgress);
      const matchPerformances = new MatchPerformancesByHomeAndAway(filteredMatches);
      return {
        name: team.teamName,
        totalPoints: matchPerformances.calculatePoints(home),
        totalGames: filteredMatches.length,
        totalVictories: matchPerformances.calculateVictories(home),
        totalDraws: matchPerformances.calculateDraws(),
        totalLosses: matchPerformances.calculateLosses(home),
        goalsFavor: matchPerformances.calculateGoalsFavor(home),
        goalsOwn: matchPerformances.calculateGoalsOwn(home),
        goalsBalance: matchPerformances.calculateGoalsBalance(home),
        efficiency: matchPerformances.calculateEfficiency(home),
      };
    });
    return orderLeaderboard(leaderboard);
  }

  async getLeaderBoard(): Promise<ILeaderboard[]> {
    const leaderboard = this.teams.map((team) => {
      const filteredMatches = this.matches.filter((match) => (match.homeTeamId === team.id
        || match.awayTeamId === team.id) && !match.inProgress);
      const matchPerformances = new FullMatchPerformances(filteredMatches);
      return {
        name: team.teamName,
        totalPoints: matchPerformances.calculatePoints(team.id),
        totalGames: filteredMatches.length,
        totalVictories: matchPerformances.calculateVictories(team.id),
        totalDraws: matchPerformances.calculateDraws(team.id),
        totalLosses: matchPerformances.calculateLosses(team.id),
        goalsFavor: matchPerformances.calculateGoalsFavor(team.id),
        goalsOwn: matchPerformances.calculateGoalsOwn(team.id),
        goalsBalance: matchPerformances.calculateGoalsBalance(team.id),
        efficiency: matchPerformances.calculateEfficiency(team.id),
      };
    });
    return orderLeaderboard(leaderboard);
  }
}
