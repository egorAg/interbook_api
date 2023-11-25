import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const WorkSpaceSchema: SchemaObject = {
  properties: {
    id: {
      example: 1,
      description: 'Workspace id',
    },
    name: {
      example: 'InterBook-Workspace',
      description: 'Workspace name',
    },
    adminId: {
      example: 1,
      description: 'Workspace admin id',
    },
    users: {
      properties: {
        id: {
          example: 1,
          description: 'User id',
        },
        name: {
          example: 'admin',
          description: 'User loin',
        },
        isActive: {
          example: true,
          description: 'User status',
        },
      },
      example: [
        {
          id: 1,
          name: 'admin',
          isActive: true,
        },
      ],
    },
  },
};
