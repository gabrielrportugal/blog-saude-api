import { container } from 'tsyringe';

import ICategoriesRepository from '../rules/ICategoriesRepository';
import CategoriesRepository from '../infra/typeorm/repositories/CategoriesRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
