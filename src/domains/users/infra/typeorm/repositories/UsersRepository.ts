import { Repository, getRepository } from 'typeorm';

import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import User from '@domains/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create(userData);

    await this.usersRepository.save(user);

    return user;
  }

  public async update(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
  }

  public async delete(user: User): Promise<void> {
    await this.usersRepository.remove(user);
  }
}

export default UsersRepository;
