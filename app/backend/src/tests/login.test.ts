import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import UserModelSequelize from '../database/models/UserModelSequelize';
import {
  invalidToken,
  loginBodyWithIncorrectEmail,
  loginBodyWithIncorrectPassword,
  loginBodyWithInvalidEmail,
  loginBodyWithInvalidPassword,
  loginBodyWithoutEmail,
  loginBodyWithoutPassword,
  token,
  userFromDb,
  validLogin,
} from './mocks/Login.mock';

chai.use(chaiHttp);

const { expect } = chai;

const invalidMsg = 'Invalid email or password';

describe('Login test', () => {
  it('should be able to login with correct email and password', async function () {
    sinon.stub(UserModelSequelize, 'findOne').resolves(userFromDb as any);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(validLogin);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  it('should not be able to login without email', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginBodyWithoutEmail);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should not be able to login without password', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginBodyWithoutPassword);

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should not be able to login with invalid email', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginBodyWithInvalidEmail);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidMsg });
  });

  it('should not be able to login with invalid password', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginBodyWithInvalidPassword);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidMsg });
  });

  it('should not be able to login with incorrect email', async function () {
    sinon.stub(UserModelSequelize, 'findOne').resolves(null);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginBodyWithIncorrectEmail);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidMsg });
  });

  it('should not be able to login with incorrect password', async function () {
    sinon.stub(UserModelSequelize, 'findOne').resolves(userFromDb as any);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(loginBodyWithIncorrectPassword);

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: invalidMsg });
  });

  it('should not be able to return  a user object without a token', async function() {
    const { status, body } = await chai
      .request(app)
      .get('/login/role');

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token not found' });
  });

  it('should not be able to return  a user object with a invalid token', async function() {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set({ "Authorization": `Bearer ${invalidToken}` });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Token must be a valid token' });
  });

  it('should be able to return  a user object with a valid token', async function() {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set({ "Authorization": `Bearer ${token}` });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ role: 'admin' });
  });

  afterEach(sinon.restore);
});
