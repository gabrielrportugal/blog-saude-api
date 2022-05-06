import { v4 } from 'uuid';

import Category from '@domains/categories/infra/typeorm/entities/Category';
import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async create(categoryData: Partial<Category>): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4() }, categoryData);

    this.categories.push(category);

    return category;
  }

  public async findByName(categoryName: string): Promise<Category> {
    const categoryExists = this.categories.find(
      category => category.name === categoryName,
    );

    if (!categoryExists) {
      const createdCategory = await this.create({ name: categoryName });

      return createdCategory;
    }

    return categoryExists;
  }
}

export default FakeCategoriesRepository;
