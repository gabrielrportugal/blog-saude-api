import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePostService from '@domains/posts/services/CreatePostService';
import ListPostsService from '@domains/posts/services/ListPostsService';
import UpdatePostService from '@domains/posts/services/UpdatePostService';
import DeletePostService from '@domains/posts/services/DeletePostService';
import GetPostService from '@domains/posts/services/GetPostService';

class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { title, description, category_name } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const newPost = await createPostService.execute({
      user_id,
      title,
      description,
      category_name,
    });

    return response.json(classToClass(newPost));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { skip, take } = request.query;

    let skipParam = 0;
    let takeParam = 0;

    if (!skip) {
      skipParam = 0;
    } else {
      skipParam = Number(skip);
    }

    if (!take) {
      takeParam = 10;
    } else {
      takeParam = Number(take);
    }

    const listPosts = container.resolve(ListPostsService);

    const posts = await listPosts.execute({
      skip: Number(skipParam),
      take: Number(takeParam),
    });

    return response.json(classToClass(posts));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { post_id, title, description, category_name } = request.body;

    const updatePostService = container.resolve(UpdatePostService);

    const updatedPost = await updatePostService.execute({
      user_id,
      title,
      category_name,
      description,
      post_id,
    });

    return response.json(classToClass(updatedPost));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { post_id } = request.query;

    const deletePostService = container.resolve(DeletePostService);

    await deletePostService.execute({
      user_id,
      post_id: post_id as string,
    });

    return response.status(204).json();
  }

  public async show(request: Request, response: Response) {
    const { post_id } = request.params;

    const getPostService = container.resolve(GetPostService);

    const post = await getPostService.execute({ post_id });

    return response.json(classToClass(post));
  }
}

export default new PostsController();
