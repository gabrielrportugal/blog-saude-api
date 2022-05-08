export const createSession = {
  tags: ['Session'],
  description: 'Cria uma sessão de login na aplicação',
  summary: 'Cria uma sessão de login na aplicação',
  operationId: 'createSession',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Dados de login',
      required: true,
      schema: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'doggie',
            description: 'Email do usuário',
          },
          password: {
            type: 'string',
            example: 'doggie',
            description: 'Senha do usuário',
          },
        },
      },
    },
  ],
  responses: {
    '200': {
      description: 'Login realizado com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
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
                  created_at: {
                    type: 'string',
                    description: 'Data de criação do usuário',
                  },
                  updated_at: {
                    type: 'string',
                    description: 'Data de atualização do usuário',
                  },
                },
              },
              token: {
                type: 'string',
                description: 'Token de autenticacao',
              },
            },
          },
        },
      },
    },
  },
};
