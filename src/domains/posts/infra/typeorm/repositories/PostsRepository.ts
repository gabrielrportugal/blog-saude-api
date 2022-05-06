import { Repository, getRepository } from 'typeorm';

import IPostsRepository from '@domains/posts/rules/IPostsRepository';
import Post from '../entities/Post';

class PostsRepository implements IPostsRepository {
  private postsRepository: Repository<Post>;

  constructor() {
    this.postsRepository = getRepository(Post);
  }

  public async create(postData: Partial<Post>): Promise<Post> {
    const post = this.postsRepository.create(postData);

    const createdPost = await this.postsRepository.save(post);

    return createdPost;
  }

  public async save(post: Post): Promise<Post> {
    return this.postsRepository.save(post);
  }

  public async findById(postId: string): Promise<Post | undefined> {
    const complaint = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['user', 'category'],
    });

    return complaint;
  }

  public async findAllByUserId(user_id: string): Promise<Post[]> {
    const complaints = await this.postsRepository.find({
      where: { user_id },
      relations: ['user', 'category'],
      order: {
        created_at: 'DESC',
      },
    });

    return complaints;
  }

  public async findAllPosts(skip: number, take: number): Promise<Post[]> {
    const complaints = await this.postsRepository.find({
      skip,
      take,
      order: {
        created_at: 'DESC',
      },
      relations: ['user', 'category'],
    });

    return complaints;
  }

  public async delete(post: Post): Promise<void> {
    await this.postsRepository.remove(post);
  }
}

export default PostsRepository;
