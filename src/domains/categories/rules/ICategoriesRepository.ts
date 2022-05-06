import Category from '../infra/typeorm/entities/Category';

export default interface ICategoriesRepository {
  create(categoryData: Partial<Category>): Promise<Category>;
  findByName(categoryName: string): Promise<Category>;
}
