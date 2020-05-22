import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByPhone(phone: string): Promise<User | null> {
    const user: User = await this.findOne({
      where: { phone },
    });

    return user || null;
  }
}

export default UsersRepository;
