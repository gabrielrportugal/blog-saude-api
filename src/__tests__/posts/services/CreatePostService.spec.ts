import IPostsRepository from '@domains/posts/rules/IPostsRepository';
import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import CreatePostService from '@domains/posts/services/CreatePostService';
import FakeUsersRepository from '@tests/users/fakes/FakeUsersRepository';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import { userMock } from '@tests/__mocks__/User.mock';
import FakePostsRepository from '../fakes/FakePostsRepository';
import FakeCategoriesRepository from '../fakes/FakeCategoriesRepository';

let fakePostsRepository: IPostsRepository;
let createPostService: CreatePostService;
let fakeUsersRepository: IUsersRepository;
let fakeCategoriesRepository: ICategoriesRepository;

describe('CreateComplaintService', () => {
  beforeEach(() => {
    fakePostsRepository = new FakePostsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createPostService = new CreatePostService(
      fakePostsRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to create a complaint', async () => {
    const user = await fakeUsersRepository.create(userMock);

    const complaint = await createPostService.execute({
      user_id: user.id,
      title: 'test complaint created',
      description: 'description of complaint created',
      category_name: 'public',
    });

    expect(complaint).toBeTruthy();
    expect(complaint.id).toBeTruthy();
    expect(complaint.title).toBe('test complaint created');
    expect(complaint.description).toBe('description of complaint created');
  });
});
