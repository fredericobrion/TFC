import * as Joi from 'joi';

const createMatchSchema = Joi.object({
  homeTeamId: Joi.number().integer().required()
    .label('homeTeamId'),
  awayTeamId: Joi.number().integer().required()
    .label('awayTeamId'),
  homeTeamGoals: Joi.number().integer().min(0).required()
    .label('homeTeamGoals'),
  awayTeamGoals: Joi.number().integer().min(0).required()
    .label('awayTeamGoals'),
}).messages({
  'number.required': 'The {{#label}} is required!!!!!!',
  'number.integer': 'The {{#label}} must be a number',
  'number.min': 'The {{#label}} cannot be less than zero',
});

export default createMatchSchema;
