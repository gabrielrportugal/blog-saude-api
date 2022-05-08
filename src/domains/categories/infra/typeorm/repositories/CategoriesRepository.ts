import { Repository, getRepository } from 'typeorm';

import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = getRepository(Category);
  }

  public async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoriesRepository.create(categoryData);

    const createdCategory = await this.categoriesRepository.save(category);

    return createdCategory;
  }

  public async findByName(categoryName: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { name: categoryName },
    });

    if (!category) {
      const createdCategory = await this.create({ name: categoryName });

      return createdCategory;
    }

    return category;
  }
}

export default CategoriesRepository;
