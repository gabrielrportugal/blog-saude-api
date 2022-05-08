import { Router } from 'express';

import PostsController from '@domains/posts/infra/http/controllers/PostsController';
import PostsByUserController from '@domains/posts/infra/http/controllers/PostsByUserController';

import ensureAuthenticate from '@domains/users/infra/http/middlewares/ensureAuthenticate';
import resolvePostValidator from '../validators/ResolvePostValidator';

const postsRoutes = Router();

postsRoutes.use(ensureAuthenticate);

postsRoutes.put('/update', resolvePostValidator, PostsController.update);

postsRoutes.get('/', PostsController.index);
postsRoutes.post('/', PostsController.create);

postsRoutes.delete('/delete', PostsController.delete);

postsRoutes.get('/my-posts', PostsByUserController.index);

postsRoutes.get('/:post_id', PostsController.show);

export default postsRoutes;
