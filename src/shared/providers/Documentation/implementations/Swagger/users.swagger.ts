export const createUser = {
  tags: ['User'],
  description: 'Cadastro de usuário',
  summary: 'Cadastra um usuário na aplicação.',
  operationId: 'createUser',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Dados para cadastro',
      required: true,
      schema: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'doggie',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            example: 'doggie@gmail.com',
            description: 'Email do usuário',
          },
          password: {
            type: 'string',
            example: '123456',
            description: 'Senha do usuário',
          },
        },
      },
    },
  ],
  responses: {
    '200': {
      description: 'Usuário cadastrado com sucesso',
      content: {
        'application/json': {
          schema: {
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
        },
      },
    },
  },
};

export const updateUser = {
  tags: ['User'],
  description: 'Atualização de usuário',
  summary: 'Atualiza um usuário cadastrado na aplicação.',
  operationId: 'updateUser',
  consumes: 'application/json',
  produces: 'application/json',
  parameters: [
    {
      in: 'body',
      name: 'body',
      description: 'Dados para atualização',
      required: true,
      schema: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: {
            type: 'string',
            example: 'doggie',
            description: 'Nome do usuário',
          },
          email: {
            type: 'string',
            example: 'doggie@gmail.com',
            description: 'Email do usuário',
          },
          oldpassword: {
            type: 'string',
            example: '12345678',
            description: 'Senha atual do usuário',
          },
          password: {
            type: 'string',
            example: '123456',
            description: 'Nova senha do usuário',
          },
          password_confirmation: {
            type: 'string',
            example: '123456',
            description: 'Confirmação de nova senha do usuário',
          },
        },
      },
    },
  ],
  responses: {
    '200': {
      description: 'Usuário atualizado com sucesso',
      content: {
        'application/json': {
          schema: {
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
        },
      },
    },
  },
};

export const getUser = {
  tags: ['User'],
  description: 'Detalhe do usuário com sessão ativa.',
  summary: 'Exibe um usuário cadastrado na aplicação.',
  operationId: 'getUser',
  consumes: 'application/json',
  produces: 'application/json',
  responses: {
    '200': {
      description: 'Usuário  com sucesso com sucesso',
      content: {
        'application/json': {
          schema: {
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
        },
      },
    },
  },
};

export const deleteUser = {
  tags: ['User'],
  description: 'Deleção de usuário com sessão ativa',
  summary: 'Deleta um usuário cadastrado na aplicação.',
  operationId: 'deleteUser',
  consumes: 'application/json',
  produces: 'application/json',
  responses: {
    '204': {
      description: 'Usuário deletado com sucesso',
    },
  },
};
