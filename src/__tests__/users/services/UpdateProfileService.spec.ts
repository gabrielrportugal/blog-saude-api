import UpdateProfileService from '@domains/users/services/UpdateProfileService';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import IHashProvider from '@domains/users/providers/HashProvider/rules/IHashProvider';
import AppError from '@shared/errors/AppError';
import User from '@domains/users/infra/typeorm/entities/User';
import FakeUsersRepository from '../fakes/FakeUsersRepository';
import FakeHashProvider from '../fakes/FakeHashProvider';

let fakeUsersRepository: IUsersRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: IHashProvider;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe@doe.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Young Man',
      email: 'youngman@teste.com',
    });

    expect(updatedUser).toBeTruthy();
    expect(updatedUser.id).toBe(user.id);
    expect(updatedUser.name).toBe('Young Man');
    expect(updatedUser).toBeInstanceOf(User);
    expect(updatedUser.email).toBe('youngman@teste.com');
  });

  it('should be able to update the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe@doe.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Young Man',
      email: 'youngman@teste.com',
      oldpassword: '123123',
      password: '123456',
      password_confirmation: '123456',
    });

    expect(updatedUser.name).toBe('Young Man');
    expect(updatedUser.email).toBe('youngman@teste.com');
  });

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'NonExistingId',
        name: 'John Doe',
        email: 'doe@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user email that is already used', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe@doe.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Young Man',
      email: 'youngman@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Young Man',
        email: 'doe@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password when there is not old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Young Man',
      email: 'youngman@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Young Man',
        email: 'doe@doe.com',
        password: '123456',
        password_confirmation: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password with the old password wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Young Man',
      email: 'youngman@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Young Man',
        email: 'doe@doe.com',
        oldpassword: 'wrongPassword',
        password: '123456',
        password_confirmation: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user password with differents password and passwordconfirmation', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Young Man',
      email: 'youngman@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Young Man',
        email: 'doe@doe.com',
        oldpassword: '123456',
        password: 'wrongPassword1',
        password_confirmation: 'wrongPassword2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Shoud calls update with correct values', async () => {
    const updateMock = jest.spyOn(fakeUsersRepository, 'update');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'doe@doe.com',
      password: '123123',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Young Man',
      email: 'youngman@teste.com',
    });

    Object.assign(user, {
      name: 'Young Man',
      email: 'youngman@teste.com',
    });

    expect(updatedUser).toBeTruthy();
    expect(updatedUser.id).toBe(user.id);
    expect(updateMock).toHaveBeenCalledWith(user);
  });
});
