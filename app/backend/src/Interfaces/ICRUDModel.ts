import { ID } from '.';

export interface ICRUDModelReader<T> {
  findAll(): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
}

export interface ICRUDModelReaderByEmail<T> {
  findByEmail(email: string): Promise<T | null>;
}
