import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import IPostsRepository from '../rules/IPostsRepository';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  user_id: string;
}

@injectable()
class GetPostsByUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Post[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User was not found');

    const posts = await this.postsRepository.findAllByUserId(user.id);

    return classToClass(posts);
  }
}

export default GetPostsByUserService;
