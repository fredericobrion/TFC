import * as Joi from 'joi';

const updateMatchSchema = Joi.object({
  homeTeamGoals: Joi.number().integer().min(0).required()
    .label('homeTeamGoals'),
  awayTeamGoals: Joi.number().integer().min(0).required()
    .label('awayTeamGoals'),
}).messages({
  'number.required': 'The {{#label}} is required',
  'number.integer': 'The {{#label}} should be a number',
  'number.min': 'The {{#label}} cannot be less than zero',
});

export default updateMatchSchema;
