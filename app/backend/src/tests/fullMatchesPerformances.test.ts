import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import FullMatchPerformances from '../classes/FullMatchPerformances';
import { allMatches, matches } from './mocks/Leaderboard.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('FullMatchesPerformances class test', () => {
  it('should calculate the victories', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateVictories(1);

    expect(victories).to.equal(3);
  });

  it('should calculate the drwas', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateDraws(1);

    expect(victories).to.equal(2);
  });

  it('should calculate the losses', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateLosses(1);

    expect(victories).to.equal(1);
  });

  it('should calculate the goals favor', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateGoalsFavor(1);

    expect(victories).to.equal(5);
  });

  it('should calculate the goals own', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateGoalsOwn(1);

    expect(victories).to.equal(3);
  });

  it('should calculate the points', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculatePoints(1);

    expect(victories).to.equal(11);
  });

  it('should calculate the goals balance', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateGoalsBalance(1);

    expect(victories).to.equal(5 - 3);
  });

  it('should calculate the efficiency', () => {
    const fullMatchPerformances = new FullMatchPerformances(matches as any);
    const victories = fullMatchPerformances.calculateEfficiency(1);

    expect(victories).to.equal('61.11');
  });
  afterEach(sinon.restore);
});