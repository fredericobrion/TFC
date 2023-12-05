import * as bcrypt from 'bcryptjs';
import JWT from '../../utils/JWT';

const validEmail = 'valid@email.com';
const invalidEmail = 'invalidEmail';
const incorrectEmail = 'incorrect@email.com';
const validPassword = 'validPassword';
const incorrectPassword = 'incorrectPassword';
const invalidPssword = '12345';
const encryptedPassword = bcrypt.hashSync(validPassword, 10);

const validLogin = {
  email: validEmail,
  password: validPassword,
};

const loginBodyWithoutEmail = {
  mail: validEmail,
  password: validPassword,
};

const loginBodyWithoutPassword = {
  email: validEmail,
  pasword: validPassword,
};

const loginBodyWithInvalidEmail = {
  email: invalidEmail,
  password: validPassword,
};

const loginBodyWithInvalidPassword = {
  email: validEmail,
  password: invalidPssword,
};

const loginBodyWithIncorrectEmail = {
  email: incorrectEmail,
  password: validPassword,
};

const loginBodyWithIncorrectPassword = {
  email: validEmail,
  password: incorrectPassword,
};

const userFromDb = {
  email: validEmail,
  password: encryptedPassword,
  role: 'admin',
};

const token = JWT.sign({ role: 'admin' });

const invalidToken = 'invalido';

export {
  validLogin,
  loginBodyWithoutEmail,
  loginBodyWithoutPassword,
  userFromDb,
  token,
  loginBodyWithInvalidEmail,
  loginBodyWithInvalidPassword,
  loginBodyWithIncorrectEmail,
  loginBodyWithIncorrectPassword,
  invalidToken,
};
