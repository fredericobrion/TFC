import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().label('email'),
  password: Joi.string().required().min(6).label('password'),
}).messages({
  'string.required': 'The {{#label}} is required',
  'string.email': 'The {{#label}} is invalid',
  'string.min': 'The {{#label}} is invalid',
});

const generateErrorMessage = (body: { email: string; password: string }) => {
  if (!body.email || !body.password) return { status: 400, message: 'All fields must be filled' };

  const { error } = loginSchema.validate(body, { abortEarly: false });

  if (!error) return null;

  return { status: 401, message: 'Invalid email or password' };
};

export default generateErrorMessage;
