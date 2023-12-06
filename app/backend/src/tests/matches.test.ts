import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModelSequelize from '../database/models/MatchModelSequelize';
import {
  finishedMatches,
  inProgressMatches,
  invalidToken,
  matches,
  token,
} from './mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  it('should return all matches', async function () {
    sinon.stub(MatchModelSequelize, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return all matches in progress', async function () {
    sinon.stub(MatchModelSequelize, 'findAll').resolves(matches as any);

    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(inProgressMatches);
  });

  it('should return all finished matches', async function () {
    sinon.stub(MatchModelSequelize, 'findAll').resolves(matches as any);

    const { status, body } = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(finishedMatches);
  });

  it('should not be able to finish a match without a token', async function () {
    // sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('should not be able to finish a match with an invalid token', async function () {
    sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it.skip('should be able to finish a match', async function () {
    sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', `Bearer ${token}`);

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  });

  // it('should not be able to update a match without a valid token', async function(){
  //   sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);
    
  //   const { status, body } = await chai
  //     .request(app)
  //     .patch('/matches/1')
  //     .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
  // });

  // it('should be able to update a match', async function () {
  //   sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);

  //   const { status, body } = await chai
  //     .request(app)
  //     .patch('/matches/1')
  //     .send({ homeTeamGoals: 3, awayTeamGoals: 1 });

  //   expect (status).to.equal(200);
  // });

  // it('should not be able to update a match that does not exist', async function () {
  //   sinon.stub(MatchModelSequelize, 'findByPk').resolves(null);

  //   const { status, body } = await chai
  //     .request(app)
  //     .patch('/matches/11658')
  //     .send({ homeTeamGoals: 3, awayTeamGoals: 1 });

  //   expect (status).to.equal(404);
  // });

  // it('should not be able to update a match that is not in progress', async function () {
  //   sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[2] as any);

  //   const { status, body } = await chai
  //     .request(app)
  //     .patch('/matches/3')
  //     .send({ homeTeamGoals: 3, awayTeamGoals: 1 });

  //   expect (status).to.equal(400);
  // });

  afterEach(sinon.restore);
});
