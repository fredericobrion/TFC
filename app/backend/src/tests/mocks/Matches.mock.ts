import JWT from '../../utils/JWT';

const inProgressMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 2,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
];

const finishedMatches = [
  {
    id: 3,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 4,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
];

const token = JWT.sign({ role: 'admin' });

const invalidToken = 'invalido';

const matches = [...inProgressMatches, ...finishedMatches];

const homeTeamId = 1;
const awayTeamId = 2;
const homeTeamGoals = 2;
const awayTeamGoals = 0;

const createdMatch = {
  id: 5,
  homeTeamId,
  homeTeamGoals,
  awayTeamId,
  awayTeamGoals,
  inProgress: true
}

export {
  matches,
  inProgressMatches,
  finishedMatches,
  token,
  invalidToken,
  homeTeamId,
  awayTeamId,
  homeTeamGoals,
  awayTeamGoals,
  createdMatch,
};
