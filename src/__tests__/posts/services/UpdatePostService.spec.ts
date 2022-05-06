import 'reflect-metadata';

import IComplaintsRepository from '@domains/posts/rules/IPostsRepository';
import ICategoriesRepository from '@domains/categories/rules/ICategoriesRepository';
import UpdateComplaintService from '@domains/posts/services/UpdatePostService';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { userMock } from '@tests/__mocks__/User.mock';
import FakeUsersRepository from '../../users/fakes/FakeUsersRepository';
import FakeComplaintsRepository from '../fakes/FakePostsRepository';
import FakeCategoriesRepository from '../fakes/FakeCategoriesRepository';

let fakeComplaintsRepository: IComplaintsRepository;
let updateComplaintService: UpdateComplaintService;
let fakeCategoriesRepository: ICategoriesRepository;
let fakeUsersRepository: IUsersRepository;

describe('UpdatePostService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeComplaintsRepository = new FakeComplaintsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    updateComplaintService = new UpdateComplaintService(
      fakeComplaintsRepository,
      fakeCategoriesRepository,
    );
  });

  it('should be able to update the complaint', async () => {
    const user = await fakeUsersRepository.create(userMock);
    const category = await fakeCategoriesRepository.create({
      name: 'test-category',
    });

    const complaint = await fakeComplaintsRepository.create({
      user_id: user.id,
      title: 'New anonynmous Complaint',
      category_id: category.id,
    });

    const updatedComplaint = await updateComplaintService.execute({
      user_id: user.id,
      post_id: complaint.id,
      title: 'Updated complaint',
      description: 'Updating complaint in test',
      category_name: 'test-category',
    });

    expect(updatedComplaint.title).toBe('Updated complaint');
    expect(updatedComplaint.description).toBe('Updating complaint in test');
  });

  it('should not be able to update a non existing complaint', async () => {
    const user = await fakeUsersRepository.create(userMock);

    await expect(
      updateComplaintService.execute({
        user_id: user.id,
        post_id: 'invalid-id',
        title: 'Updated complaint',
        description: 'Updating complaint in test',
        category_name: 'test-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a complaint that user have not created', async () => {
    const user = await fakeUsersRepository.create(userMock);

    const category = await fakeCategoriesRepository.create({
      name: 'test-category',
    });

    const complaint = await fakeComplaintsRepository.create({
      user_id: user.id,
      title: 'New anonynmous Complaint',
      category_id: category.id,
    });

    await expect(
      updateComplaintService.execute({
        user_id: 'invalid-id',
        post_id: complaint.id,
        title: 'Updated complaint',
        description: 'Updating complaint in test',
        category_name: 'test-category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
