import { Router, Request, Response } from 'express';

import userRoutes from '@domains/users/infra/http/routes/users.routes';
import sessionsRoutes from '@domains/users/infra/http/routes/sessions.routes';
import postsRoutes from '@domains/posts/infra/http/routes/posts.routes';

const routes = Router();

routes.get('/', (_: Request, res: Response) => {
  return res.json({
    status: 'Welcome to Saude ID Blog',
    message: `You can access the documentation on the link: http://${process.env.APP_URL}/api/docs`,
  });
});

routes.use('/users', userRoutes);
routes.use('/posts', postsRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
