import { createSession } from './sessions.swagger';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  getPost,
  myPosts,
} from './posts.swagger';
import { createUser, getUser, updateUser, deleteUser } from './users.swagger';

export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'Blog Saude API',
    description: 'Documentação de API do Blog Saude',
    termsOfService: '',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Example: Bearer token',
    },
  },
  servers: [
    {
      url: 'http://localhost:3333/',
      description: 'Local server',
    },
  ],
  paths: {
    '/sessions': {
      post: createSession,
    },
    '/users': {
      post: createUser,
      delete: deleteUser,
    },
    '/users/profile': {
      put: updateUser,
      get: getUser,
    },
    '/posts': {
      get: getPosts,
      post: createPost,
    },
    '/posts/update': {
      put: updatePost,
    },
    '/posts/delete': {
      delete: deletePost,
    },
    '/posts/{post_id}': {
      get: getPost,
    },
    '/posts/my-posts': {
      get: myPosts,
    },
  },
};
