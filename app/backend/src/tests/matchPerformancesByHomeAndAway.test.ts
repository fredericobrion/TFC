import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import MatchPerformancesByHomeAndAway from '../classes/MatchPerformancesByHomeAndAway';
import { allMatches, homeMatches, matches } from './mocks/Leaderboard.mock';

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('FullMatchesPerformances class test', () => {
  it('should calculate the home victories', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateVictories(true);

    expect(victories).to.equal(2);
  });

  it('should calculate the drwas', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateDraws();

    expect(victories).to.equal(1);
  });

  it('should calculate the home losses', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateLosses(true);

    expect(victories).to.equal(0);
  });

  it('should calculate the home goals favor', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateGoalsFavor(true);

    expect(victories).to.equal(3);
  });

  it('should calculate the home goals own', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateGoalsOwn(true);

    expect(victories).to.equal(1);
  });

  it('should calculate the home points', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculatePoints(true);

    expect(victories).to.equal(7);
  });

  it('should calculate the home goals balance', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateGoalsBalance(true);

    expect(victories).to.equal(3 - 1);
  });

  it('should calculate the home efficiency', () => {
    const matchPerformancesByHomeAndAway = new MatchPerformancesByHomeAndAway(homeMatches as any);
    const victories = matchPerformancesByHomeAndAway.calculateEfficiency(true);

    expect(victories).to.equal('77.78');
  });
  afterEach(sinon.restore);
});