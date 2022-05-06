import 'reflect-metadata';

import IComplaintsRepository from '@domains/posts/rules/IPostsRepository';
import GetComplaintService from '@domains/posts/services/GetPostService';
import Complaint from '@domains/posts/infra/typeorm/entities/Post';
import AppError from '@shared/errors/AppError';
import FakeComplaintsRepository from '../fakes/FakePostsRepository';

let fakeComplaintsRepository: IComplaintsRepository;
let getComplaintService: GetComplaintService;

describe('GetPostService', () => {
  beforeEach(() => {
    fakeComplaintsRepository = new FakeComplaintsRepository();
    getComplaintService = new GetComplaintService(fakeComplaintsRepository);
  });

  it('Should be able to return a post', async () => {
    jest
      .spyOn(fakeComplaintsRepository, 'findById')
      .mockReturnValueOnce(Promise.resolve({ id: 'valid_id' } as Complaint));

    const complaint = await getComplaintService.execute({
      post_id: 'valid_id',
    });

    expect(complaint).toBeTruthy();
    expect(complaint.id).toBeTruthy();
  });

  it('Should not be able to return a complaint if complaint does not exists', async () => {
    await expect(
      getComplaintService.execute({
        post_id: 'valid_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
