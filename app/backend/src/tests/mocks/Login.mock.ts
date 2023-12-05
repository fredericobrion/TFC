import bcrypt from 'bcryptjs';
import JWT from '../../utils/JWT';

const validEmail = 'valid@email.com';
const validPassword = 'validPassword';
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

const userFromDb = {
	email: validEmail,
	password: encryptedPassword,
}

const token = JWT.sign({ email: validEmail });

export { validLogin, loginBodyWithoutEmail, loginBodyWithoutPassword, userFromDb, token };
