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
  awayTeamGoals,
  awayTeamId,
  homeTeamGoals,
  homeTeamId,
  createdMatch,
} from './mocks/Matches.mock';
import TeamModelSequelize from '../database/models/TeamModelSequelize';
import { teams } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', () => {
  describe('GET /matches', () => {
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

    afterEach(sinon.restore);
  })

  describe('PATCH /matches/:id/finish', () => {
    it('should not be able to finish a match without a token', async function () {
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

    afterEach(sinon.restore);
  })

  describe('PATCH /matches/:id', () => {
    it('should not be able to update a match without a valid token', async function(){
      sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);
      
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });
  
    it('should not be able to update a match with an invalid token', async function () {
      sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .set('Authorization', `Bearer ${invalidToken}`);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  
    it('should not be able to update a match without homeTeamGoals', async function () {
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ awayTeamGoals: 1 });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"homeTeamGoals\" is required" });
    });
  
    it('should not be able to update a match without awayTeamGoals', async function () {
      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamGoals: 1 });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"awayTeamGoals\" is required" });
    });
  
    it('should not be able to update a match that does not exist', async function () {
      sinon.stub(MatchModelSequelize, 'findByPk').resolves(null);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/11658')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
  
      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: 'Match not found' });
    });
  
    it('should not be able to update a match that is not in progress', async function () {
      sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[2] as any);
  
      const { status, body } = await chai
        .request(app)
        .patch('/matches/3')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Match is already finished' });
    });
  
    // it('should be able to update a match', async function () {
    //   sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);
  
    //   const { status, body } = await chai
    //     .request(app)
    //     .patch('/matches/1')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send({ homeTeamGoals: 3, awayTeamGoals: 1 });
  
    //   expect(status).to.equal(200);
    //   expect(body).to.deep.equal({ message: 'Updated' });
    // });

    it.skip('should be able to update a match', async function () {
      
      
      sinon.stub(MatchModelSequelize, 'findByPk').resolves(matches[0] as any);
      sinon.stub(MatchModelSequelize.prototype, 'save').resolves();

      const { status, body } = await chai
        .request(app)
        .patch('/matches/1')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamGoals: 3, awayTeamGoals: 1 });

      expect(status).to.equal(200);
      expect(body).to.deep.equal({ message: 'Updated' });
    });

    afterEach(sinon.restore);
  });

  describe('POST /matches', () => {
    it('should not be able to create a match without a token', async function () {
      const { status, body } = await chai.request(app).post('/matches');
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token not found' });
    });
  
    it('should not be able to create a match with an invalid token', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${invalidToken}`);
  
      expect(status).to.equal(401);
      expect(body).to.deep.equal({ message: 'Token must be a valid token' });
    });
  
    it('should not be able to create a match without homeTeamId', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ awayTeamId, homeTeamGoals, awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"homeTeamId\" must be a number" });
    });

    it('should not be able to create a match without homeTeamId being a number', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId: 'a', awayTeamId, homeTeamGoals, awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"homeTeamId\" must be a number" });
    });
  
    it('should not be able to create a match without awayTeamId', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, homeTeamGoals, awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"awayTeamId\" must be a number" });
    });

    it('should not be able to create a match without awayTeamId being a number', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId: 'a', homeTeamGoals, awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"awayTeamId\" must be a number" });
    });
  
    it('should not be able to create a match without homeTeamGoals', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ awayTeamId, homeTeamId, awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"homeTeamGoals\" must be a number" });
    });

    it('should not be able to create a match without homeTeamGoals being a number', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId, homeTeamGoals: 'a', awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"homeTeamGoals\" must be a number" });
    });
  
    it('should not be able to create a match without awayTeamGoals', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ awayTeamId, homeTeamGoals, homeTeamId });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"awayTeamGoals\" must be a number" });
    });

    it('should not be able to create a match without awayTeamGoals being a number', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals: 'a' });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "\"awayTeamGoals\" must be a number" });
    });

    it('should not be able to create a match when homeTeamId is equal to awayTeamId', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId: awayTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });
  
      expect(status).to.equal(422);
      expect(body).to.deep.equal({ message: "It is not possible to create a match with two equal teams" });
    });

    it('should not be able to create a match when homeTeamId does not exist', async function () {
      sinon.stub(TeamModelSequelize, 'findAll').resolves(teams as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId: 100, awayTeamId, homeTeamGoals, awayTeamGoals });

      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: "There is no team with such id!" });
    });

    it('should not be able to create a match when awayTeamId does not exist', async function () {
      sinon.stub(TeamModelSequelize, 'findAll').resolves(teams as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId: 100, homeTeamGoals, awayTeamGoals });

      expect(status).to.equal(404);
      expect(body).to.deep.equal({ message: "There is no team with such id!" });
    });

    it('should not be able to create a match when homeTeamGoals is less than 0', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId, homeTeamGoals: -1, awayTeamGoals });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "The \"homeTeamGoals\" cannot be less than zero" });
    });

    it('should not be able to create a match when awayTeamGoals is less than 0', async function () {
      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals: -1 });
  
      expect(status).to.equal(400);
      expect(body).to.deep.equal({ message: "The \"awayTeamGoals\" cannot be less than zero" });
    });

    it('should be able to create a match', async function () {
      sinon.stub(MatchModelSequelize, 'create').resolves(createdMatch as any);

      const { status, body } = await chai
        .request(app)
        .post('/matches')
        .set('Authorization', `Bearer ${token}`)
        .send({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals });

      expect(status).to.equal(201);
      expect(body).to.deep.equal(createdMatch);
    });

    afterEach(sinon.restore);
  });
});
