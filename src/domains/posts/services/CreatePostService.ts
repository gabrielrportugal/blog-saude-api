import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../rules/IPostsRepository';

interface IRequest {
  user_id: string;
  category_name: string;
  title: string;
  description: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    user_id,
    title,
    description,
    category_name,
  }: IRequest): Promise<Post> {
    const category = await this.categoriesRepository.findByName(category_name);

    const post = await this.postsRepository.create({
      user_id,
      title,
      description,
      category_id: category.id,
    });

    return classToClass(post);
  }
}

export default CreatePostService;
