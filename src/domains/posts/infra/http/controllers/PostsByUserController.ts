import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GetPostsByUserService from '@domains/posts/services/GetPostsByUserService';

class PostsByUserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const service = container.resolve(GetPostsByUserService);

    const post = await service.execute({ user_id });

    return response.json(post);
  }
}

export default new PostsByUserController();
