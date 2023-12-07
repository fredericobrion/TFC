import { IMatch } from '../Interfaces/matches/IMatch';

export default class FullMatchPerformances {
  private matches: IMatch[];

  constructor(matches: IMatch[]) {
    this.matches = matches;
  }

  calculateVictories(id: number): number {
    const homeVictories = this.matches.filter(
      (match) =>
        match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals,
    ).length;

    const awayVictories = this.matches.filter(
      (match) =>
        match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals,
    ).length;

    if (id === 7) console.log('vitórias ', homeVictories + awayVictories);

    return homeVictories + awayVictories;
  }

  calculateDraws(id: number): number {
    const draws = this.matches.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;

    if (id === 7) console.log('empates ', draws);

    return draws;
  }

  calculateLosses(id: number): number {
    const homeLosses = this.matches.filter(
      (match) =>
        match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals,
    ).length;

    const awayLosses = this.matches.filter(
      (match) =>
        match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals,
    ).length;

    return homeLosses + awayLosses;
  }

  calculateGoalsFavor(id: number): number {
    const goals = this.matches.reduce((accumulator, match) => {
      if (match.homeTeamId === id) {
        return accumulator + match.homeTeamGoals;
      }
      return accumulator + match.awayTeamGoals;
    }, 0);
    return goals;
  }

  calculateGoalsOwn(id: number): number {
    const goals = this.matches.reduce((accumulator, match) => {
      if (match.homeTeamId === id) {
        return accumulator + match.awayTeamGoals;
      }
      return accumulator + match.homeTeamGoals;
    }, 0);
    return goals;
  }

  calculatePoints(id: number): number {
    const victories = this.calculateVictories(id);
    const draws = this.calculateDraws(id);

    return (victories * 3) + draws;
  }

  calculateGoalsBalance(id: number): number {
    const goalsFavor = this.calculateGoalsFavor(id);
    const goalsOwn = this.calculateGoalsOwn(id);

    return goalsFavor - goalsOwn;
  }

  calculateEfficiency(id: number): string {
    const points = this.calculatePoints(id);
    const games = this.matches.length;

    const efficiency = ((points * 100) / (games * 3)).toFixed(2);

    return efficiency;
  }
}
