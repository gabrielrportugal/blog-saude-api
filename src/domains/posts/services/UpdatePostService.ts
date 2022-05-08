import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../rules/IPostsRepository';

interface IRequest {
  user_id: string;
  post_id: string;
  category_name: string;
  title: string;
  description: string;
}

@injectable()
class UpdatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    user_id,
    post_id,
    title,
    description,
    category_name,
  }: IRequest): Promise<Post> {
    const post = await this.postsRepository.findById(post_id);
    const category = await this.categoriesRepository.findByName(category_name);

    if (!post) {
      throw new AppError('Post not found.');
    }

    if (post.user_id !== user_id) {
      throw new AppError('A user can only update posts that have created.');
    }

    Object.assign(post, {
      title,
      description,
      category_id: category.id,
      category,
    } as Omit<Partial<Post>, 'id'>);

    await this.postsRepository.save(post);

    return classToClass(post);
  }
}

export default UpdatePostService;
