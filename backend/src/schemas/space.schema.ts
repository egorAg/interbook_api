import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const SpaceSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {
      example: 1,
      description: 'Workspace ID',
    },
    name: {
      example: '23ef6841-2c2f-4d73-99b1-9113f2eac748',
      description: 'Workspace name',
    },
    adminId: {
      example: 1,
      description: 'Workspace administrator id',
    },
  },
  example: {
    id: 1,
    name: '23ef6841-2c2f-4d73-99b1-9113f2eac748',
    adminId: 1,
  },
};
