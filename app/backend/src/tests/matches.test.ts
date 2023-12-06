import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModelSequelize from '../database/models/MatchModelSequelize';
import {
  finishedMatches,
  inProgressMatches,
  matches,
} from './mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe.only('Matches test', () => {
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
});
