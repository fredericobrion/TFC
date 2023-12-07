import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModelSequelize from '../database/models/TeamModelSequelize';
import { allMatches, awayResult, homeResult, teams } from './mocks/Leaderboard.mock';
import MatchModelSequelize from '../database/models/MatchModelSequelize';
import Leaderboard from '../classes/Leaderboard';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard test', () => {
  describe('GET /leaderboard/home', () => {
    it('should return the ordered leaderboard', async () => {
      sinon.stub(TeamModelSequelize, 'findAll').resolves(teams as any);
      sinon.stub(MatchModelSequelize, 'findAll').resolves(allMatches as any);
      sinon.stub(Leaderboard.prototype, 'getLeaderBoardByHomeAndAway').resolves(homeResult as any);

      const { status, body } = await chai
        .request(app)
        .get('/leaderboard/home');

      expect(status).to.equal(200);
      expect(body).to.deep.equal(homeResult);
    })

    afterEach(sinon.restore);
  });
});
