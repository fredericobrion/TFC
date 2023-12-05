import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';
import TeamModelSequelize from '../database/models/TeamModelSequelize';

import { Response } from 'superagent';
import { team1, teams } from './mocks/Teams.mock';
import UserModelSequelize from '../database/models/UserModelSequelize';
import { token, userFromDb, validLogin } from './mocks/Login.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
  it('should be able to login with correct email and password', async function() {
    sinon.stub(UserModelSequelize, 'findOne').resolves(userFromDb as any);

    const { status, body } = await chai.request(app).post('/login').send(validLogin);
  
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ token });
  });

  

  afterEach(sinon.restore);
});
