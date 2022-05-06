import { Router } from 'express';

import PostsController from '@domains/posts/infra/http/controllers/PostsController';
import PostsByUserController from '@domains/posts/infra/http/controllers/PostsByUserController';

import ensureAuthenticate from '@domains/users/infra/http/middlewares/ensureAuthenticate';
import resolveComplaintValidator from '../validators/ResolvePostValidator';

const complaintsRoutes = Router();

complaintsRoutes.use(ensureAuthenticate);

complaintsRoutes.put(
  '/update',
  resolveComplaintValidator,
  PostsController.update,
);

complaintsRoutes.get('/', PostsController.index);
complaintsRoutes.get('/myposts', PostsController.index);

complaintsRoutes.delete('/delete', PostsController.delete);

complaintsRoutes.get('/:post_id', PostsController.show);

complaintsRoutes.get('/activities/resume', PostsByUserController.index);

export default complaintsRoutes;
