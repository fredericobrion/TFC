import { IUser } from '../Interfaces/users/IUser';
import UserModelSequelize from '../database/models/UserModelSequelize';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = UserModelSequelize;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) return null;

    const { password, id, role, username }: IUser = dbData;
    return { id, username, email, password, role };
  }
}
