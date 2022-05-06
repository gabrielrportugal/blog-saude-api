import { container } from 'tsyringe';

import IPostsRepository from '../rules/IPostsRepository';
import PostsRepository from '../infra/typeorm/repositories/PostsRepository';

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository,
);
