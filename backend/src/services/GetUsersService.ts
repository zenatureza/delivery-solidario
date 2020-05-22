import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

class GetUsersService {
  public async execute(): Promise<User[]> {
    return getCustomRepository(UsersRepository).find();
  }
}

export default GetUsersService;
