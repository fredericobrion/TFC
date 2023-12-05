import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUserModel } from '../Interfaces/users/IUserModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';

type LoginServiceResponse = {
  token: string;
};

export default class LoginService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  async login(
    email: string,
    password: string,
  ): Promise<ServiceResponse<LoginServiceResponse>> {
    const user = await this.userModel.findByEmail(email);

    if (user?.email !== email || !bcrypt.compareSync(password, user.password)) {
      return {
        status: 'INVALID_DATA',
        data: { message: 'Invalid email or password' },
      };
    }

    const payload = { role: user.role };
    const token = JWT.sign(payload);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
