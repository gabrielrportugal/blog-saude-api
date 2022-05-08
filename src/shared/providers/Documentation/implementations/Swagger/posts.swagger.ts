export const getPosts = {
  tags: ['Post'],
  description: 'Lista as publicações.',
  summary: 'Lista as publicações para o usuário',
  operationId: 'getPosts',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'query',
      name: 'skip',
      description: 'Quantidade de publicações a pular',
      required: false,
      schema: {
        type: 'integer',
      },
    },
    {
      in: 'query',
      name: 'take',
      description: 'Quantidade de publicações a retornar',
      required: false,
      schema: {
        type: 'integer',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Listagem de posts carregada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID da publicação',
              },
              user_id: {
                type: 'string',
                description: 'ID do usuário',
              },
              title: {
                type: 'string',
                description: 'Título da publicação',
              },
              description: {
                type: 'string',
                description: 'Descrição da publicação',
              },
              category_id: {
                type: 'string',
                description: 'ID da categoria',
              },
              category: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID da categoria',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome da categoria',
                  },
                  created_at: {
                    type: 'string',
                    description: 'Data de criação da categoria',
                  },
                  updated_at: {
                    type: 'string',
                    description: 'Data de atualização da categoria',
                  },
                },
              },
              created_at: {
                type: 'string',
                description: 'Data de criação da categoria',
              },
              updated_at: {
                type: 'string',
                description: 'Data de atualização da categoria',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID do usuário',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Email do usuário',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const createPost = {
  tags: ['Post'],
  description: 'Cria uma publicação',
  summary: 'Realiza ação de criação de uma publicação',
  operationId: 'createPost',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Dados para criação de publicação.',
      required: true,
      schema: {
        type: 'object',
        required: ['title', 'description', 'category_name'],
        properties: {
          title: {
            type: 'string',
            example: 'doggie',
            description: 'Titulo da publicação',
          },
          description: {
            type: 'string',
            example: 'doggie',
            description: 'Descrição da publicação',
          },
          category_name: {
            type: 'string',
            example: 'doggie',
            description: 'Nome da categoria da publicação',
          },
        },
      },
    },
  ],
  responses: {
    '200': {
      description: 'Publicação realizada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID da publicação',
              },
              user_id: {
                type: 'string',
                description: 'ID do usuário',
              },
              title: {
                type: 'string',
                description: 'Título da publicação',
              },
              description: {
                type: 'string',
                description: 'Descrição da publicação',
              },
              category_id: {
                type: 'string',
                description: 'ID da categoria',
              },
              category: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID da categoria',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome da categoria',
                  },
                  created_at: {
                    type: 'string',
                    description: 'Data de criação da categoria',
                  },
                  updated_at: {
                    type: 'string',
                    description: 'Data de atualização da categoria',
                  },
                },
              },
              created_at: {
                type: 'string',
                description: 'Data de criação da categoria',
              },
              updated_at: {
                type: 'string',
                description: 'Data de atualização da categoria',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID do usuário',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Email do usuário',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const updatePost = {
  tags: ['Post'],
  description: 'Atualiza uma publicação',
  summary: 'Realiza ação de atualização de uma publicação',
  operationId: 'updatePost',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Dados para atualização da publicação.',
      required: true,
      schema: {
        type: 'object',
        required: ['title', 'description', 'category_name', 'post_id'],
        properties: {
          title: {
            type: 'string',
            example: 'doggie',
            description: 'Titulo da publicação',
          },
          description: {
            type: 'string',
            example: 'doggie',
            description: 'Descrição da publicação',
          },
          category_name: {
            type: 'string',
            example: 'doggie',
            description: 'Nome da categoria da publicação',
          },
          post_id: {
            type: 'string',
            example: 'doggie',
            description: 'ID da publicação',
          },
        },
      },
    },
  ],
  responses: {
    '200': {
      description: 'Publicação atualizada com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID da publicação',
              },
              user_id: {
                type: 'string',
                description: 'ID do usuário',
              },
              title: {
                type: 'string',
                description: 'Título da publicação',
              },
              description: {
                type: 'string',
                description: 'Descrição da publicação',
              },
              category_id: {
                type: 'string',
                description: 'ID da categoria',
              },
              category: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID da categoria',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome da categoria',
                  },
                  created_at: {
                    type: 'string',
                    description: 'Data de criação da categoria',
                  },
                  updated_at: {
                    type: 'string',
                    description: 'Data de atualização da categoria',
                  },
                },
              },
              created_at: {
                type: 'string',
                description: 'Data de criação da categoria',
              },
              updated_at: {
                type: 'string',
                description: 'Data de atualização da categoria',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID do usuário',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Email do usuário',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const deletePost = {
  tags: ['Post'],
  description: 'Deleta uma publicação',
  summary: 'Realiza ação de deletar de uma publicação',
  operationId: 'updatePost',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Dados para deletar a publicação.',
      required: true,
      schema: {
        type: 'object',
        required: ['post_id'],
        properties: {
          post_id: {
            type: 'string',
            example: 'doggie',
            description: 'ID da publicação para deletar',
          },
        },
      },
    },
  ],
  responses: {
    '204': {
      description: 'Publicação deletada com sucesso',
    },
  },
};

export const getPost = {
  tags: ['Post'],
  description: 'Exibe detalhes de uma publicação.',
  summary: 'Exibe os detalhes de uma publicação específica.',
  operationId: 'getPost',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'path',
      name: 'post_id',
      description: 'ID da publicação para exibir detalhes.',
      required: false,
      schema: {
        type: 'string',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Detalhes do post carregado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID da publicação',
              },
              user_id: {
                type: 'string',
                description: 'ID do usuário',
              },
              title: {
                type: 'string',
                description: 'Título da publicação',
              },
              description: {
                type: 'string',
                description: 'Descrição da publicação',
              },
              category_id: {
                type: 'string',
                description: 'ID da categoria',
              },
              category: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID da categoria',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome da categoria',
                  },
                  created_at: {
                    type: 'string',
                    description: 'Data de criação da categoria',
                  },
                  updated_at: {
                    type: 'string',
                    description: 'Data de atualização da categoria',
                  },
                },
              },
              created_at: {
                type: 'string',
                description: 'Data de criação da categoria',
              },
              updated_at: {
                type: 'string',
                description: 'Data de atualização da categoria',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID do usuário',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Email do usuário',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const myPosts = {
  tags: ['Post'],
  description: 'Exibe as publicações realizadas pelo usuário.',
  summary:
    'Exibe todas as publicações realizadas pelo usuário com sessão ativa.',
  operationId: 'myPosts',
  consumes: 'application/json',
  produces: 'application/json',
  responses: {
    '200': {
      description: 'Listagem dos posts do usuário carregado com sucesso.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                description: 'ID da publicação',
              },
              user_id: {
                type: 'string',
                description: 'ID do usuário',
              },
              title: {
                type: 'string',
                description: 'Título da publicação',
              },
              description: {
                type: 'string',
                description: 'Descrição da publicação',
              },
              category_id: {
                type: 'string',
                description: 'ID da categoria',
              },
              category: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID da categoria',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome da categoria',
                  },
                  created_at: {
                    type: 'string',
                    description: 'Data de criação da categoria',
                  },
                  updated_at: {
                    type: 'string',
                    description: 'Data de atualização da categoria',
                  },
                },
              },
              created_at: {
                type: 'string',
                description: 'Data de criação da categoria',
              },
              updated_at: {
                type: 'string',
                description: 'Data de atualização da categoria',
              },
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                    description: 'ID do usuário',
                  },
                  name: {
                    type: 'string',
                    description: 'Nome do usuário',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Email do usuário',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
