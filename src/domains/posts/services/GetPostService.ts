import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import IPostsRepository from '../rules/IPostsRepository';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  post_id: string;
}

@injectable()
class GetPostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ post_id }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) throw new AppError('Post was not found');

    return classToClass(post);
  }
}

export default GetPostService;
