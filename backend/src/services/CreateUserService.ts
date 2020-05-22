import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  first_name: string;
  last_name: string;
  phone: string;
  is_provider: boolean;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    first_name,
    last_name,
    phone,
    is_provider,
    email,
    password,
  }: Request): Promise<User> {
    // TODO: Migrar p/ validateProperty
    if (!first_name) {
      throw new Error('First name not provided!');
    }

    if (!last_name) {
      throw new Error('Last name not provided!');
    }

    if (!email) {
      throw new Error('Email not provided!');
    }

    if (!password) {
      throw new Error('Password not provided!');
    }

    const userRepository = getCustomRepository(UsersRepository);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error('Email already used');
    }

    const hashedPassword = await hash(password, 8);

    const user: User = userRepository.create({
      first_name,
      last_name,
      phone,
      is_provider,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default CreateUserService;
