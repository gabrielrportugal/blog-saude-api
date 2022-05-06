import IPostsRepository from '@domains/posts/rules/IPostsRepository';
import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import DeletePostService from '@domains/posts/services/DeletePostService';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { userMock } from '@tests/__mocks__/User.mock';
import FakeUsersRepository from '../../users/fakes/FakeUsersRepository';
import FakePostsRepository from '../fakes/FakePostsRepository';
import FakeCategoriesRepository from '../fakes/FakeCategoriesRepository';

let fakePostsRepository: IPostsRepository;
let fakeCategoriesRepository: ICategoriesRepository;
let deletePostService: DeletePostService;
let fakeUsersRepository: IUsersRepository;

describe('DeletePostService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePostsRepository = new FakePostsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    deletePostService = new DeletePostService(fakePostsRepository);
  });

  it('should be able to delete the post', async () => {
    const user = await fakeUsersRepository.create(userMock);
    const category = await fakeCategoriesRepository.create({
      name: 'test-category',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      title: 'New post',
      category_id: category.id,
    });

    const deleteFuncion = jest.spyOn(fakePostsRepository, 'delete');

    await deletePostService.execute({
      user_id: user.id,
      post_id: post.id,
    });

    expect(deleteFuncion).toBeCalledWith(post);
  });

  it('should not be able to delete a non existing post', async () => {
    const user = await fakeUsersRepository.create(userMock);

    await expect(
      deletePostService.execute({
        user_id: user.id,
        post_id: 'invalid_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to delete a non post that user have not created', async () => {
    const user = await fakeUsersRepository.create(userMock);

    const category = await fakeCategoriesRepository.create({
      name: 'test-category',
    });

    const post = await fakePostsRepository.create({
      user_id: user.id,
      title: 'New anonynmous post',
      category_id: category.id,
    });

    await expect(
      deletePostService.execute({
        user_id: 'invalid_id',
        post_id: post.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
