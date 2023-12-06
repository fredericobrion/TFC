import { IMatch } from './IMatch';

type TeamName = {
  teamName: string | undefined;
};

export default interface IMatchWithTeams extends IMatch {
  homeTeam: TeamName;
  awayTeam: TeamName;
}
