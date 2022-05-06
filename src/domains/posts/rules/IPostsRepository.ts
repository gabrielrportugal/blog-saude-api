import Post from '../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  create(postData: Partial<Post>): Promise<Post>;
  save(post: Post): Promise<Post>;
  delete(post: Post): Promise<void>;
  findById(postId: string): Promise<Post | undefined>;
  findAllByUserId(user_id: string): Promise<Post[]>;
  findAllPosts(skip: number, take: number): Promise<Post[]>;
}
