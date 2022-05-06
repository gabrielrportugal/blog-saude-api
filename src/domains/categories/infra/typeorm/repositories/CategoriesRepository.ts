import { Repository, getRepository } from 'typeorm';

import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Repository<Category>;

  constructor() {
    this.categoriesRepository = getRepository(Category);
  }

  public async create(categoryData: Partial<Category>): Promise<Category> {
    const complaint = this.categoriesRepository.create(categoryData);

    const createdComplaint = await this.categoriesRepository.save(complaint);

    return createdComplaint;
  }

  public async findByName(categoryName: string): Promise<Category> {
    const complaint = await this.categoriesRepository.findOne({
      where: { name: categoryName },
    });

    if (!complaint) {
      const createdComplaint = await this.create({ name: categoryName });

      return createdComplaint;
    }

    return complaint;
  }
}

export default CategoriesRepository;
