import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../rules/IPostsRepository';

interface IRequest {
  skip: number;
  take: number;
}

@injectable()
class ListPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,
  ) {}

  public async execute({ skip, take }: IRequest): Promise<Post[]> {
    const posts = await this.postsRepository.findAllPosts(skip, take);

    return classToClass(posts);
  }
}

export default ListPostsService;
