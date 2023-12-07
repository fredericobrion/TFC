import ILeaderboard from '../Interfaces/leaderboard/ILeaderboard';

const orderLeaderboard = (leaderboard: ILeaderboard[]): ILeaderboard[] => {
  const sortedLeaderboard = leaderboard.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsFavor - a.goalsOwn > b.goalsFavor - b.goalsOwn) return -1;
    if (a.goalsFavor - a.goalsOwn < b.goalsFavor - b.goalsOwn) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    return 0;
  });
  return sortedLeaderboard;
};

export default orderLeaderboard;
