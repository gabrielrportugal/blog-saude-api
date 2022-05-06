import IComplaintsRepository from '@domains/posts/rules/IPostsRepository';
import GetComplaintsByUserService from '@domains/posts/services/GetPostsByUserService';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@tests/users/fakes/FakeUsersRepository';
import FakeComplaintsRepository from '../fakes/FakePostsRepository';
import { userMock } from '../../__mocks__/User.mock';

let fakeUsersRepsoitory: IUsersRepository;
let fakeComplaintsRepository: IComplaintsRepository;
let service: GetComplaintsByUserService;

describe('GetPostsByUserService', () => {
  beforeAll(() => {
    fakeUsersRepsoitory = new FakeUsersRepository();
    fakeComplaintsRepository = new FakeComplaintsRepository();

    service = new GetComplaintsByUserService(
      fakeUsersRepsoitory,
      fakeComplaintsRepository,
    );
  });

  it('Should not be able to get the complaints if user does not exists', async () => {
    await expect(
      service.execute({ user_id: 'invalid_id' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to get the complaints by user', async () => {
    const user = await fakeUsersRepsoitory.create(userMock);

    const complaints = await service.execute({ user_id: user.id });

    expect(complaints).toBeTruthy();
    expect(complaints).toBeInstanceOf(Array);
  });
});
