import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchPerformancesByHomeAndAway {
  private matches: IMatch[];

  constructor(matches: IMatch[]) {
    this.matches = matches;
  }

  calculateVictories(home: boolean): number {
    const victories = this.matches.filter((match) =>
      (home
        ? match.homeTeamGoals > match.awayTeamGoals
        : match.homeTeamGoals < match.awayTeamGoals)).length;
    return victories;
  }

  calculateDraws(): number {
    const draws = this.matches.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
    return draws;
  }

  calculateLosses(home: boolean): number {
    const losses = this.matches.filter((match) =>
      (home
        ? match.homeTeamGoals < match.awayTeamGoals
        : match.homeTeamGoals > match.awayTeamGoals)).length;
    return losses;
  }

  calculateGoalsFavor(home: boolean): number {
    const goals = this.matches.reduce((accumulator, match) => {
      if (home) {
        return accumulator + match.homeTeamGoals;
      }
      return accumulator + match.awayTeamGoals;
    }, 0);
    return goals;
  }

  calculateGoalsOwn(home: boolean): number {
    const goals = this.matches.reduce((accumulator, match) => {
      if (home) {
        return accumulator + match.awayTeamGoals;
      }
      return accumulator + match.homeTeamGoals;
    }, 0);
    return goals;
  }

  calculatePoints(home: boolean): number {
    const victories = this.calculateVictories(home);
    const draws = this.calculateDraws();

    return victories * 3 + draws;
  }

  calculateGoalsBalance(home: boolean): number {
    const goalsFavor = this.calculateGoalsFavor(home);
    const goalsOwn = this.calculateGoalsOwn(home);

    return goalsFavor - goalsOwn;
  }

  calculateEfficiency(home: boolean): string {
    const points = this.calculatePoints(home);
    const games = this.matches.length;

    const efficiency = ((points * 100) / (games * 3)).toFixed(2);

    return efficiency.toString();
  }
}
