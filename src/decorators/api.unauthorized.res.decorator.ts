import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiUnauthorizedRes = applyDecorators(
  ApiResponse({
    description: 'Unauthorized',
    status: 401,
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Forbidden resource',
        },
        error: {
          type: 'string',
          example: 'Forbidden',
        },
        statusCode: {
          type: 'number',
          example: 401,
        },
      },
    },
  }),
);
