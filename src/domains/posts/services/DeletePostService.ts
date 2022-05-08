import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPostsRepository from '../rules/IPostsRepository';

interface IRequest {
  user_id: string;
  post_id: string;
}

@injectable()
class DeletePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ user_id, post_id }: IRequest): Promise<void> {
    const post = await this.postsRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not found.');
    }

    if (post.user_id !== user_id) {
      throw new AppError('A user can only delete a post that have created.');
    }

    await this.postsRepository.delete(post);
  }
}

export default DeletePostService;
