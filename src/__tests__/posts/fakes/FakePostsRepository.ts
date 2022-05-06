import { v4 } from 'uuid';

import Post from '@domains/posts/infra/typeorm/entities/Post';
import IPostsRepository from '@domains/posts/rules/IPostsRepository';

class FakePostsRepository implements IPostsRepository {
  private posts: Post[] = [];

  public async findAllByUserId(user_id: string): Promise<Post[]> {
    const userPosts = this.posts.filter(post => {
      return post.user_id === user_id;
    });

    return userPosts;
  }

  public async findById(postId: string): Promise<Post | undefined> {
    const postExists = this.posts.find(post => post.id === postId);

    return postExists;
  }

  public async create(postData: Partial<Post>): Promise<Post> {
    const post = new Post();

    Object.assign(post, { id: v4() }, postData);

    this.posts.push(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    this.posts.push(post);

    return post;
  }

  public async findAllPosts(skip = 0, take = 10): Promise<Post[]> {
    const findPosts = this.posts.slice(skip, take);

    return findPosts;
  }

  public async delete(post: Post): Promise<void> {
    const postIndex = this.posts.findIndex(postItem => postItem.id === post.id);

    this.posts.slice(postIndex);
  }
}

export default FakePostsRepository;
