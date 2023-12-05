import { ICRUDModelReaderByEmail } from '../ICRUDModel';
import { IUser } from './IUser';

export interface IUserModel extends ICRUDModelReaderByEmail<IUser> {
  findByEmail(email: IUser['email']): Promise<IUser | null>;
}
