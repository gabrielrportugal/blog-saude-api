import CreateUserService from '@domains/users/services/CreateUserService';
import IUsersRepository from '@domains/users/rules/IUsersRepository';
import IHashProvider from '@domains/users/providers/HashProvider/rules/IHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../fakes/FakeUsersRepository';
import FakeHashProvider from '../fakes/FakeHashProvider';

describe('CreateUserService', () => {
  let fakeUsersRepository: IUsersRepository;
  let createUserService: CreateUserService;
  let fakeHashProvider: IHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    jest
      .spyOn(fakeHashProvider, 'generateHash')
      .mockReturnValueOnce(Promise.resolve('hashed_password'));
    const user = await createUserService.execute({
      name: 'jhon',
      email: 'doe@doe.com',
      password: '123123',
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.name).toBe('jhon');
    expect(user.email).toBe('doe@doe.com');
    expect(user.password).toBe('hashed_password');
  });

  it('Should not able to create a new user with the same email', async () => {
    await createUserService.execute({
      name: 'jhon',
      email: 'doe@doe.com',
      password: '123123',
    });

    await expect(
      createUserService.execute({
        name: 'jhon2',
        email: 'doe@doe.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should calls create with correct values', async () => {
    jest
      .spyOn(fakeHashProvider, 'generateHash')
      .mockReturnValueOnce(Promise.resolve('hashed_password'));

    const user = await createUserService.execute({
      name: 'jhon',
      email: 'doe@doe.com',
      password: '123123',
    });

    expect(user).toBeTruthy();
    expect(user.id).toBeTruthy();
    expect(user.name).toBe('jhon');
    expect(user.email).toBe('doe@doe.com');
    expect(user.password).toBe('hashed_password');
  });
});
