import IComplaintsRepository from '@domains/posts/rules/IPostsRepository';
import ListComplaintsService from '@domains/posts/services/ListPostsService';
import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import { userMock } from '@tests/__mocks__/User.mock';
import FakeComplaintsRepository from '../fakes/FakePostsRepository';
import FakeUsersRepository from '../../users/fakes/FakeUsersRepository';
import FakeCategoriesRepository from '../fakes/FakeCategoriesRepository';

let fakeComplaintsRepository: IComplaintsRepository;
let fakeCategoriesRepository: ICategoriesRepository;
let fakeUsersRepository: IUsersRepository;

let listComplaintsService: ListComplaintsService;

describe('ListPostsService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeComplaintsRepository = new FakeComplaintsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    listComplaintsService = new ListComplaintsService(fakeComplaintsRepository);
  });

  it('should be able to list the complaints created', async () => {
    const user = await fakeUsersRepository.create(userMock);
    const category = await fakeCategoriesRepository.create({
      name: 'test-category',
    });

    await fakeComplaintsRepository.create({
      user_id: user.id,
      title: 'New anonynmous Complaint',
      category_id: category.id,
    });

    await fakeComplaintsRepository.create({
      user_id: user.id,
      title: 'another New Complaint',
      category_id: category.id,
    });

    const listComplaints = await listComplaintsService.execute({
      skip: 0,
      take: 10,
    });

    expect(listComplaints).toHaveLength(2);
  });
});
